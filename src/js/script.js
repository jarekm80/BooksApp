
{
  'use strict';

  const select = {
    template: {
      book: '#template-book',
    },
    container: {
      bookList: '.books-list',
      bookImage: '.book__image',
      filters: '.filters',
    },
    book: {
      id: 'data-id',
      f: 'favorite',
    }
  };

  const templates = {
    bookTemp: Handlebars.compile(document.querySelector(select.template.book).innerHTML),
  };

  class BooksList {
    constructor() {
      const thisBL = this;
      thisBL.favoriteBooks = [];
      thisBL.filters = [];
      thisBL.render();
      thisBL.getElements();
      thisBL.initActions();
    }  

    getElements(){
      const thisBL = this;

      thisBL.dom = {};
      thisBL.dom.filtersForm = document.querySelector(select.container.filters).querySelector('form');
      thisBL.dom.listOfLinksWithImages = document.querySelector(select.container.bookList);
    } 
    
    
    setBack(Rating){
      let background = '';
      if (Rating < 6) {
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);';
      } else if (Rating > 6 && Rating <= 8) {
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%);';
      } else if (Rating > 8 && Rating <= 9) {
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);';
      } else {
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);';
      }
      return background;
    }

    render(){
      const thisBL = this;
      for (let book of dataSource.books){
        book.ratingWidth = book.rating * 10;
        book.ratingBgc = thisBL.setBack(book.rating);
        const generatedHTML = templates.bookTemp(book);
        /* [DONE] create element using utils.createElementFromHTML */
        const DOMelement = utils.createDOMFromHTML(generatedHTML);
        /* [DONE] find menu container */
        const bookListContainer = document.querySelector(select.container.bookList);
        /* [DONE] add element to menu */
        bookListContainer.appendChild(DOMelement);
      }
    }

    // patent na uproszczenie ?????
    isFiltered(book){
      const thisBL = this;
      let filtered = false;
      const adultsChecked = thisBL.filters.indexOf('adults') !== -1;
      const nonFictionChecked = thisBL.filters.indexOf('nonFiction') !== -1;
      if ((adultsChecked && book.details.adults) || (nonFictionChecked && book.details.nonFiction)){
        filtered = true;
      } 
      if (adultsChecked && nonFictionChecked) {
        if (book.details.adults && book.details.nonFiction) {
          filtered = true;
        } else {
          filtered = false;
        } 
      }
      if (!adultsChecked && !nonFictionChecked){
        filtered = true;
      }
      return filtered;
    }

    filterBooks(){
      const thisBL = this;
      for (let book of dataSource.books){
        let domBook = document.querySelector('[data-id=' + CSS.escape(book.id) + ']'); //można przenieść do getElements ?????
        if (!thisBL.isFiltered(book)){
          domBook.classList.add('hidden');
        } else {
          domBook.classList.remove('hidden');
        }
      }
      
    }


    initActions(){
      const thisBL = this;
      thisBL.dom.filtersForm.addEventListener('click',function(event){
        //event.preventDefault(); ?????
        const checkBox = event.target;
        if (checkBox.tagName === 'INPUT' && checkBox.type === 'checkbox' && checkBox.name === 'filter'){
          if (checkBox.checked && !thisBL.filters.includes(checkBox.value)){
            thisBL.filters.push(checkBox.value);
          } else if (!checkBox.checked && thisBL.filters.includes(checkBox.value)){
            const index = thisBL.filters.indexOf(checkBox.value);
            thisBL.filters.splice(index,1);
          }
        }
        thisBL.filterBooks();
      }); 

      //select whole UL
      thisBL.dom.listOfLinksWithImages.addEventListener('dblclick',function(event){
        event.preventDefault();
        //if parent of target img is a
        if (event.target.offsetParent.classList.contains('book__image')){
          const linkWithImage = event.target.offsetParent;
          const bookID = linkWithImage.getAttribute(select.book.id);
          if (thisBL.favoriteBooks.includes(bookID)){
            linkWithImage.classList.remove(select.book.f);
            for (var i = 0;i < thisBL.favoriteBooks.length;i++){
              if (thisBL.favoriteBooks[i] === bookID){
                thisBL.favoriteBooks.splice(i,1);
              }
            }
          } else {
            thisBL.favoriteBooks.push(bookID);
            linkWithImage.classList.add(select.book.f);
          }
        }
      });
    }
  }  

  new BooksList();
}