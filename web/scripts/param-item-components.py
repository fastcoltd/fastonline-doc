#!/usr/bin/env python3
"""
脚本：商品组件参数化 (E-1 ~ E-3)
1. 修改 3 个商品组件文件（价格/库存硬编码 -> {{param}}）
2. 更新 responsive wrapper
3. 更新所有调用方 include 添加 item_price/item_stock 参数
"""
import re, json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'src')

# Step 1: Component file edits
COMPONENT_EDITS = {
    'src/partials/components/item-card-vertical.html': [
        ('<p class="item-price">$325.00</p>', '<p class="item-price">{{item_price}}</p>'),
        ('<p class="item-stock">52</p>', '<p class="item-stock">{{item_stock}}</p>'),
    ],
    'src/partials/components/item-all-horizontal-item.html': [
        ('<p class="item-price">$325.00</p>', '<p class="item-price">{{item_price}}</p>'),
        ('<p class="item-stock">52</p>', '<p class="item-stock">{{item_stock}}</p>'),
    ],
    'src/partials/components/item-all-horizontal-mobile-item.html': [
        ('<span class="item-all-horizontal-mobile-price">$325.00</span>',
         '<span class="item-all-horizontal-mobile-price">{{item_price}}</span>'),
        ('<span class="item-all-horizontal-mobile-stock-text">52</span>',
         '<span class="item-all-horizontal-mobile-stock-text">{{item_stock}}</span>'),
    ],
}

NEW_PARAMS = {'item_price': '$325.00', 'item_stock': '52'}

def edit_components():
    for rel_path, edits in COMPONENT_EDITS.items():
        fp = os.path.join(ROOT, rel_path)
        with open(fp) as f:
            content = f.read()
        for old, new in edits:
            if old in content:
                content = content.replace(old, new)
            else:
                print(f"  WARNING: not found in {rel_path}: {old[:50]}...")
        with open(fp, 'w') as f:
            f.write(content)
        print(f"  Updated: {rel_path}")

def update_wrapper():
    """Update item-all-horizontal-item-responsive.html to pass item_price/item_stock"""
    fp = os.path.join(ROOT, 'src/partials/components/item-all-horizontal-item-responsive.html')
    with open(fp) as f:
        content = f.read()

    # Add item_price, item_stock to both include lines (desktop and mobile)
    # Find all '"item_button_class":"...}'  and add the new params before closing brace
    extra = ',"item_price":"{{item_price}}","item_stock":"{{item_stock}}"}'
    # The closing is always '"} -->' pattern for each include
    pattern = r'"item_button_class":"\{\{item_button_class\}\}"\}'
    replacement = '"item_button_class":"{{item_button_class}}"' + extra.replace('"}', '') + '}'
    content = re.sub(pattern, replacement, content)

    with open(fp, 'w') as f:
        f.write(content)
    print(f"  Updated wrapper: src/partials/components/item-all-horizontal-item-responsive.html")

def add_params_to_include(include_line):
    """Add item_price and item_stock to an include line's JSON params."""
    json_start = include_line.index('{')
    json_end = include_line.rindex('}') + 1
    json_str = include_line[json_start:json_end]
    try:
        params = json.loads(json_str)
    except json.JSONDecodeError:
        return include_line

    modified = False
    for key, default_val in NEW_PARAMS.items():
        if key not in params:
            params[key] = default_val
            modified = True

    if not modified:
        return include_line

    new_json = json.dumps(params, ensure_ascii=False, separators=(',', ':'))
    return include_line[:json_start] + new_json + include_line[json_end:]

def update_file_includes(filepath, component_names):
    """Find all includes to given component files and add missing params."""
    fp = os.path.join(ROOT, filepath) if not filepath.startswith('/') else filepath
    with open(fp) as f:
        content = f.read()

    modified = False
    for comp_name in component_names:
        # Pattern: includes to this component with JSON params
        pattern = rf'<!--\s*@include\s+[^>]*{re.escape(comp_name)}\s*\{{[^}}]+\}}\s*-->'
        def replacer(match):
            nonlocal modified
            result = add_params_to_include(match.group(0))
            if result != match.group(0):
                modified = True
            return result
        content = re.sub(pattern, replacer, content)

    if modified:
        with open(fp, 'w') as f:
            f.write(content)
        print(f"  Updated: {filepath}")
    return modified

# Find all files that include the target components
def find_all_callers():
    """Scan all .html files in src/ for includes to our target components."""
    target_components = [
        'item-card-vertical.html',
        'item-all-horizontal-item-responsive.html',
        'item-all-horizontal-item.html',
        'item-all-horizontal-mobile-item.html',
    ]

    files_to_update = set()
    for root_dir, dirs, files in os.walk(SRC):
        dirs[:] = [d for d in dirs if d not in ('node_modules', '.git')]
        for fname in files:
            if not fname.endswith('.html'):
                continue
            fp = os.path.join(root_dir, fname)
            rel = os.path.relpath(fp, ROOT)
            with open(fp) as f:
                content = f.read()
            for comp in target_components:
                if comp in content:
                    files_to_update.add(rel)
                    break
    return sorted(files_to_update)

if __name__ == '__main__':
    print("Step 1: Editing component files...")
    edit_components()

    print("\nStep 2: Updating responsive wrapper...")
    update_wrapper()

    print("\nStep 3: Finding all caller files...")
    callers = find_all_callers()
    print(f"  Found {len(callers)} files to check")

    print("\nStep 4: Adding item_price/item_stock to callers...")
    target_comps = ['item-card-vertical.html', 'item-all-horizontal-item-responsive.html']
    for f in callers:
        update_file_includes(f, target_comps)

    print("\nDone! Run 'node scripts/build-pages.js' to verify.")
