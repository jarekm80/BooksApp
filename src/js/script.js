
{
  'use strict';

  const select = {
    template: {
      book: '#template-book',
    },
    container: {
      bookList: '.books-list',
    },
  };

  const templates = {
    bookTemp: Handlebars.compile(document.querySelector(select.template.book).innerHTML),
  };

  function renderHTMLBook(){
    for (let book of dataSource.books){
      const generatedHTML = templates.bookTemp(book);
      /* [DONE] create element using utils.createElementFromHTML */
      const DOMelement = utils.createDOMFromHTML(generatedHTML);
      /* [DONE] find menu container */
      const bookListContainer = document.querySelector(select.container.bookList);
      /* [DONE] add element to menu */
      bookListContainer.appendChild(DOMelement);
      console.log(DOMelement);
    }
  }
  renderHTMLBook();
}