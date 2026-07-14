$(document).ready(function () {
    // 下拉框选项数据
    const selectOptions = {
        country: [
            { value: 'china', text: 'China' },
            { value: 'english', text: 'English' }
        ],
        timeZone: [
            { value: 'Africa/Abidjan', text: 'GMT+0 Africa/Abidjan' },
            { value: 'America/Adak', text: 'GMT-10 America/Adak' },
        ],
        language: [
            { value: 'English', text: 'English (United States)' },
            { value: 'Chinese', text: 'Chinese (China)' }
        ],
        contactInformation: [
            { value: 'phone', text: '电话' },
            { value: 'email', text: '邮箱' }
        ]
    };
    const quillRule = new Quill('#editorRule', {
        theme: 'snow',
        placeholder: '请输入内容...',
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline'],
                ['link', 'image', 'blockquote', 'code-block'],
                [{ 'header': [1, 2, false] }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }]
            ]
        }
    });
    // quillRule.root.innerHTML = '<p>这是初始内容。</p>';
    const quillDes = new Quill('#editorDes', {
        theme: 'snow',
        placeholder: '请输入内容...',
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline'],
                ['link', 'image', 'blockquote', 'code-block'],
                [{ 'header': [1, 2, false] }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }]
            ]
        }
    });
    $('div.filter-custom-select').each(function () {
        let dataType = $(this).data('type')
        let select = this
        // 生成下拉内容
        generateDropdownHtml($(this));
        let that = this
        $(that).on('click', '.filter-dropdown-item', function (e) {
            e.stopPropagation();
            let value = $(e.target).data('value')
            let text = $(e.target).text()
            let option = {
                value,
                text
            }

            $(that).attr('data-value', value)
            $(that).find('.filter-custom-select-text').text(text)
            $(that).toggleClass('active')
            if (dataType == 'contactInformation') {
                $('[name="contactValue"]').show().val('').attr('placeholder', `请输入${text}`)
            }
        })
        $(that).on('click', function () {
            let type = $(this).attr('data-type')
            console.log(type)
            $('div.filter-custom-select').each((a, item) => {
                console.log($(item).attr('data-type'))
                if ($(item).attr('data-type') != type) {
                    $(item).removeClass('active')
                }
            });
            $(this).toggleClass('active')
        })
    })
    function generateDropdownHtml(item) {
        let options = selectOptions[item.data('type')]
        let htmlStr = ''
        if (options && options.length) {
            options.forEach(function (option) {
                htmlStr += `<div class="filter-dropdown-item" data-value="${option.value}"><span
            class="filter-dropdown-item-text" data-value="${option.value}">${option.text}</span></div>`
            })
            item.find('.filter-dropdown-content').html(htmlStr)
        }
    }
    // quillDes.root.innerHTML = '<p>这是初始内容。</p>';
    // $(document).on('click', function () {
    //     console.log(quillRule.root.innerHTML)
    // })
    $('[data-upload-role="avatar"] > img, [data-upload-role="avatar"] > div').on('click', function () {
        $('#avatarInput').trigger('click')
    })
    $('#avatarInput').on('change', function (e) {
        var file = this.files[0]; // 获取选中的文件
        if (file) {
            $('[data-upload-role="avatar"] > img').show()
            $('[data-upload-role="avatar"] > div').hide()
            var reader = new FileReader(); // 创建FileReader对象
            reader.onload = function (e) {
                $('[data-upload-role="avatar"] > img').attr('src', e.target.result)
                console.log($('[data-upload-role="avatar"] > img'))
            };
            reader.readAsDataURL(file); // 读取文件内容作为DataURL
        } else {
            $('[data-upload-role="avatar"] > img').hide()
            $('[data-upload-role="avatar"] > div').show()
        }
    });
    $('[data-upload-role="logo"] > img, [data-upload-role="logo"] > div').on('click', function () {
        $('#logoInput').trigger('click')
    })
    $('#logoInput').on('change', function (e) {
        var file = this.files[0]; // 获取选中的文件
        if (file) {
            $('[data-upload-role="logo"] > img').show()
            $('[data-upload-role="logo"] > div').hide()
            var reader = new FileReader(); // 创建FileReader对象
            reader.onload = function (e) {
                $('[data-upload-role="logo"] > img').attr('src', e.target.result)
            };
            reader.readAsDataURL(file); // 读取文件内容作为DataURL
        } else {
            $('[data-upload-role="logo"] > img').show()
            $('[data-upload-role="logo"] > div').hide()
        }
    });
    $('.submit-btn-wrapper').on('click', function () {
        let formData = new FormData(); // 创建FormData对象
        $avatarInput = $('[name="avatar"]')[0]
        $logoInput = $('[name="logo"]')[0]
        $country = $('.filter-custom-select[data-type="country"]')
        $timeZone = $('.filter-custom-select[data-type="timeZone"]')
        $language = $('.filter-custom-select[data-type="language"]')
        $storeName = $('[name="storeName"]')
        $time = $('[name="time"]')
        $slogan = $('[name="slogan"]')
        $introduction = $('[name="introduction"]')
        $team = $('[name="team"]')
        $contactType = $('.filter-custom-select[data-type="contactInformation"]')
        $contactValue = $('[name="contactValue"]')
        $agreement = $('[name="agreement"]')
        if ($avatarInput.files.length > 0) {
            formData.append('avatar', $avatarInput.files[0])
        } else {
            formData.append('avatar', '')
        }
        if ($logoInput.files.length > 0) {
            formData.append('logo', $logoInput.files[0])
        } else {
            formData.append('logo', '')
        }
        formData.append('country', $country.attr('data-value'))
        formData.append('timeZone', $timeZone.attr('data-value'))
        formData.append('language', $language.attr('data-value'))
        formData.append('storeName', $storeName.val())
        formData.append('time', $time.val())
        formData.append('slogan', $slogan.val())
        formData.append('introduction', $introduction.val())
        formData.append('team', $team)
        formData.append('rule', quillRule.root.innerHTML)
        formData.append('des', quillDes.root.innerHTML)
        formData.append('contactType', $contactType.attr('data-value'))
        formData.append('contactValue', $contactValue.val())
        formData.append('accept', $agreement.prop('checked'))
        console.log(Array.from(formData.entries()));
        if (!$agreement.prop('checked')) {
            alert('请同意')
        }
        // let data = {
        //     avatar: '',
        //     logo: '',
        //     country: '',
        //     timeZone: '',
        //     language: '',
        //     storeName: '',
        //     time: '',
        //     slogan: '',
        //     introduction: '',
        //     team: '',
        //     rule: '',
        //     des: '',
        //     contactType: '',
        //     contactValue: '',
        //     accept: ''
        // }
    })
})
