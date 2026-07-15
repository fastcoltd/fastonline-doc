class Search {
    constructor() {
        this.container = document.querySelector('.page-search-section');
        this.input = this.container.querySelector('[data-search-role="input"]');
        this.button = this.container.querySelector('[data-search-role="submit"]');
        this.init();
    }

    init() {
        this.button.addEventListener('click', () => {
            const inputValue = this.input.value;
            if (!inputValue || inputValue.length <= 0) {
                return
            }
            console.log('search value: ', inputValue);
            window.searchItems(inputValue);
        });
    }
}
