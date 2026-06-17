#!/usr/bin/env python3
"""
脚本：店铺组件参数化
1. 修改 4 个店铺组件文件（硬编码值 -> {{param}}）
2. 更新 2 个 responsive wrapper（添加参数传递）
3. 更新 3 个页面的 include 调用（添加新参数）
"""
import re, json, sys, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# --- Step 1: Component file replacements ---
# Each entry: (file_path, [(old_string, new_string), ...])
COMPONENT_EDITS = {
    "src/partials/components/store-all-horizontal-item.html": [
        ('src="image/figma-best-store-avatar.png"', 'src="{{store_avatar}}"'),
        ('href="store-detail.html?name=store-name"', 'href="{{store_link}}"'),
        ('<p class="item-title">Store name</p>', '<p class="item-title">{{store_name}}</p>'),
        ('<p class="item-desc">Connecting Ideas, Empowering Futures</p>', '<p class="item-desc">{{store_subtitle}}</p>'),
        ('"score":"5.0","recommend":"(62)"', '"score":"{{rating_score}}","recommend":"{{rating_recommend}}"'),
        ('<p class="item-detail">Beatae voluptas ducimus. Suscipit minus voluptas aspernatur sit nulla rerum deserunt.\n                Facilis aut ，Beataspernatur sit nulla rerum deserunt. Facilis aut Beatae voluptas ducimus.\n                Suscipit minus voluptas aspernatur sit nulla rerum deserunt. Facilis aut</p>',
         '<p class="item-detail">{{store_description}}</p>'),
        ('<p class="item-brand">Quora</p>', '<p class="item-brand" style="color: {{brand_color}};">{{brand_name}}</p>'),
        ('<p class="item-service">Cloud Service</p>', '<p class="item-service">{{service_name}}</p>'),
    ],
    "src/partials/components/best-store-item.html": [
        ('src="image/figma-best-store-avatar.png"', 'src="{{store_avatar}}"'),
        ('href="store-detail.html?name=store-name"', 'href="{{store_link}}"'),
        ('<p class="item-title">Store name</p>', '<p class="item-title">{{store_name}}</p>'),
        ('<p class="item-desc">Connecting Ideas, Empowering Futures</p>', '<p class="item-desc">{{store_subtitle}}</p>'),
        ('"score":"4.3","recommend":"(200)"', '"score":"{{rating_score}}","recommend":"{{rating_recommend}}"'),
        ('<p class="store-item-detail">Beatae voluptas ducimus. Suscipit minus voluptas\n                aspernatur sit nulla rerum deserunt. Facilis aut</p>',
         '<p class="store-item-detail">{{store_description}}</p>'),
        ('<p class="item-brand" style="color: #FF1B20;">Quora</p>', '<p class="item-brand" style="color: {{brand_color}};">{{brand_name}}</p>'),
        ('<p class="item-service">Cloud Service</p>', '<p class="item-service">{{service_name}}</p>'),
    ],
    "src/partials/components/store-all-horizontal-mobile-item.html": [
        ('src="image/figma-best-store-avatar.png"', 'src="{{store_avatar}}"'),
        ('<span class="store-all-horizontal-mobile-ad">AD</span>', '<span class="store-all-horizontal-mobile-ad">{{ad_text}}</span>'),
        ('href="store-detail.html?name=store-name"', 'href="{{store_link}}"'),
        ('Store StoreStoreStoreStore', '{{store_name}}'),
        ('Choose Our Store, You Won\'t Go Wrong - We\'ll Guide You to Satisfaction Every Step...',
         '{{store_subtitle}}'),
        ('"score":"5.0","recommend":"(62)"', '"score":"{{rating_score}}","recommend":"{{rating_recommend}}"'),
        ('<span class="store-all-horizontal-mobile-brand-text">Quora</span>', '<span class="store-all-horizontal-mobile-brand-text">{{brand_name}}</span>'),
        ('<span class="store-all-horizontal-mobile-service-text">Cloud SeCloudSe...</span>', '<span class="store-all-horizontal-mobile-service-text">{{service_name}}</span>'),
    ],
    "src/partials/components/store-all-vertical-mobile-item.html": [
        ('src="image/figma-best-store-avatar.png"', 'src="{{store_avatar}}"'),
        ('href="store-detail.html?name=store-name"', 'href="{{store_link}}"'),
        ('<p class="item-title">Store name</p>', '<p class="item-title">{{store_name}}</p>'),
        ('<p class="item-desc">Connecting Ideas, Empowering Futures</p>', '<p class="item-desc">{{store_subtitle}}</p>'),
        ('"score":"4.3","recommend":"(200)"', '"score":"{{rating_score}}","recommend":"{{rating_recommend}}"'),
        ('<p class="store-item-detail">Beatae voluptas ducimus. Suscipit minus voluptas\n                aspernatur sit nulla rerum deserunt. Facilis aut</p>',
         '<p class="store-item-detail">{{store_description}}</p>'),
        ('<p class="item-brand" style="color: #FF1B20;">Quora</p>', '<p class="item-brand" style="color: {{brand_color}};">{{brand_name}}</p>'),
        ('<p class="item-service">Cloud Service</p>', '<p class="item-service">{{service_name}}</p>'),
    ],
}

# Tag replacement for tags section (whole block -> {{item_tags}})
TAG_BLOCK_PATTERNS = [
    # store-all-horizontal-item.html - 7 tags
    (r'<div class="item-tag-box">\s*<a class="item-tag".*?</a>\s*</div>',
     '<div class="item-tag-box">\n        {{item_tags}}\n    </div>'),
]

def replace_tags_block(content):
    """Replace tag blocks with {{item_tags}}"""
    # Match the whole tag box content
    pattern = r'(<div class="item-tag-box">)\s*\n(\s*<a class="item-tag".*?</a>\s*\n)+(\s*</div>)'
    replacement = r'\1\n        {{item_tags}}\n    \3'
    return re.sub(pattern, replacement, content)

def edit_component_files():
    for rel_path, edits in COMPONENT_EDITS.items():
        filepath = os.path.join(ROOT, rel_path)
        with open(filepath, 'r') as f:
            content = f.read()

        for old, new in edits:
            if old not in content:
                print(f"  WARNING: pattern not found in {rel_path}: {old[:60]}...")
            content = content.replace(old, new)

        # Replace tag blocks
        content = replace_tags_block(content)

        with open(filepath, 'w') as f:
            f.write(content)
        print(f"  Updated: {rel_path}")

# --- Step 2: Update responsive wrappers ---
WRAPPER_PARAMS = [
    'store_avatar', 'store_name', 'store_subtitle', 'rating_score',
    'rating_recommend', 'store_description', 'brand_name', 'brand_color',
    'service_name', 'item_tags', 'store_link'
]

def update_wrappers():
    wrappers = [
        'src/partials/components/store-all-vertical-item-responsive.html',
        'src/partials/components/store-all-horizontal-item-responsive.html',
    ]
    for rel_path in wrappers:
        filepath = os.path.join(ROOT, rel_path)
        with open(filepath, 'r') as f:
            content = f.read()

        # Insert new params before the closing of each include's JSON, after aria_pressed
        extra_params = ','.join([f'"{p}":"{{{{{p}}}}}"' for p in WRAPPER_PARAMS])
        # Pattern: "aria_pressed":"{{aria_pressed}}"} -->
        # Replace with: "aria_pressed":"{{aria_pressed}}",extra_params} -->
        pattern = r'"aria_pressed":"\{\{aria_pressed\}\}"\}'
        replacement = f'"aria_pressed":"{{{{aria_pressed}}}}",{extra_params}}}'
        content = re.sub(pattern, replacement, content)

        with open(filepath, 'w') as f:
            f.write(content)
        print(f"  Updated wrapper: {rel_path}")

# --- Step 3: Update page includes ---
PAGE_STORE_PARAMS = {
    'store_avatar': 'image/figma-best-store-avatar.png',
    'store_name': 'Store name',
    'store_subtitle': 'Connecting Ideas, Empowering Futures',
    'rating_score': '4.3',
    'rating_recommend': '(200)',
    'store_description': 'Beatae voluptas ducimus.',
    'brand_name': 'Quora',
    'brand_color': '#FF1B20',
    'service_name': 'Cloud Service',
    'item_tags': '<a class="item-tag" href="tag-all.html?type=store&name=store-name" target="_self"><span class="item-tag-text">ChangeUser</span></a>',
    'store_link': 'store-detail.html?name=store-name',
}

def update_page_includes(page_path):
    filepath = os.path.join(ROOT, page_path)
    with open(filepath, 'r') as f:
        content = f.read()

    # Pattern: find includes for store-all-vertical-item-responsive or store-all-horizontal-item-responsive
    # These use JSON params like {"like":"0","like_icon":"...","aria_pressed":"false"}
    def add_store_params(match):
        include_line = match.group(0)
        # Extract JSON params
        json_start = include_line.index('{')
        json_end = include_line.rindex('}') + 1
        json_str = include_line[json_start:json_end]

        try:
            params = json.loads(json_str)
        except json.JSONDecodeError:
            print(f"  WARNING: cannot parse JSON in: {include_line[:80]}...")
            return include_line

        # Add missing store params
        modified = False
        for key, default_val in PAGE_STORE_PARAMS.items():
            if key not in params:
                params[key] = default_val
                modified = True

        if not modified:
            return include_line

        new_json = json.dumps(params, ensure_ascii=False, separators=(',', ':'))
        return include_line[:json_start] + new_json + include_line[json_end:]

    # Find store-all-vertical-item-responsive or store-all-horizontal-item-responsive includes
    pattern = r'<!--\s*@include\s+\.\./partials/components/store-all-(?:vertical|horizontal)-item-responsive\.html\s+\{[^}]+\}\s*-->'
    new_content = re.sub(pattern, add_store_params, content)

    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        count = len(re.findall(pattern, content))
        print(f"  Updated {count} includes in: {page_path}")
    else:
        print(f"  No changes needed in: {page_path}")

# --- Main ---
if __name__ == '__main__':
    print("Step 1: Editing component files...")
    edit_component_files()

    print("\nStep 2: Updating responsive wrappers...")
    update_wrappers()

    print("\nStep 3: Updating page includes...")
    for page in ['src/pages/index.html', 'src/pages/tag-all.html', 'src/pages/store-all.html']:
        update_page_includes(page)

    print("\nDone! Run 'node scripts/build-pages.js' to verify.")
