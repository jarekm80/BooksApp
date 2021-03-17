
{
  'use strict';

  const select = {
    template: {
      book: '#template-book',
    },
    container: {
      bookList: '.books-list',
      bookImage: '.book__image'
    },
    book: {
      id: 'data-id',
      f: 'favorite',
    }
  };

  const templates = {
    bookTemp: Handlebars.compile(document.querySelector(select.template.book).innerHTML),
  };

  const favoriteBooks = [];

  function render(){
    for (let book of dataSource.books){
      const generatedHTML = templates.bookTemp(book);
      /* [DONE] create element using utils.createElementFromHTML */
      const DOMelement = utils.createDOMFromHTML(generatedHTML);
      /* [DONE] find menu container */
      const bookListContainer = document.querySelector(select.container.bookList);
      /* [DONE] add element to menu */
      bookListContainer.appendChild(DOMelement);
    }
  }


  function initActions(){
    //select whole UL
    const listOfLinksWithImages = document.querySelector(select.container.bookList);
    listOfLinksWithImages.addEventListener('dblclick',function(event){
      event.preventDefault();
      //if parent of target img is a
      if (event.target.offsetParent.classList.contains('book__image')){
        const linkWithImage = event.target.offsetParent;
        const bookID = linkWithImage.getAttribute(select.book.id);
        if (favoriteBooks.includes(bookID)){
          linkWithImage.classList.remove(select.book.f);
          for (var i = 0;i < favoriteBooks.length;i++){
            if (favoriteBooks[i] === bookID){
              favoriteBooks.splice(i,1);
            }
          }
        } else {
          favoriteBooks.push(bookID);
          linkWithImage.classList.add(select.book.f);
        }
      }
    });
  }


  render();
  initActions();
}