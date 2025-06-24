class Search {
    constructor() {
        this.container = document.querySelector('.page-search-section');
        this.input = this.container.querySelector('.page-search-input');
        this.button = this.container.querySelector('.page-search-icon');
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