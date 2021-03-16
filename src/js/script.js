
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
    const linksWithImages = document.querySelectorAll(select.container.bookImage);
    for (let linkWithImage of linksWithImages){
      linkWithImage.addEventListener('dblclick',function(){
        const attributeOfLink = linkWithImage.getAttribute(select.book.id);        
        favoriteBooks.push(attributeOfLink);
        console.log(favoriteBooks);
        linkWithImage.classList.add(select.book.f);
      });
    }
  }


  render();
  initActions();
}