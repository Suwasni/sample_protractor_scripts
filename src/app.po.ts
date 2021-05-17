import { $, $$, browser, by, element, ElementFinder, ElementArrayFinder, ExpectedConditions } from 'protractor';

export class AppPage {
  getBookDeleteIcon(index: number): ElementFinder {
    return this.getBookDeleteIcons().get(index)
  }

  getBookDeleteIcons(): ElementArrayFinder {
    return $$('[data-test-book-delete-icon]')
  }

  getBookDetailsAuthorInput(): ElementFinder {
    return $('[data-test-book-details-author-input]')
  }

  getBookDetailsCancelButton(): ElementFinder {
    return $('[data-test-book-details-cancel-button]')
  }

  getBookDetailsCard(): ElementFinder {
    return $('mat-card')
  }

  getBookDetailsPublisherInput(): ElementFinder {
    return $('[data-test-book-details-publisher-input]')
  }

  getBookDetailsSaveButton(): ElementFinder {
    return $('[data-test-book-details-save-button]')
  }

  getBookDetailsTitle(): ElementFinder {
    return $('[data-test-book-details-title]')
  }

  getBookDetailsTitleInput(): ElementFinder {
    return $('[data-test-book-details-title-input]')
  }

  getBookDetailsYearInput(): ElementFinder {
    return $('[data-test-book-details-year-input]')
  }

  getBookListItem(index: number): ElementFinder {
    return this.getBookListItems().get(index)
  }

  getBookListItems(): ElementArrayFinder {
    return $$('mat-list-item')
  }

  getBookTitle(index: number): ElementFinder {
    return this.getBookTitles().get(index)
  }

  getBookTitles(): ElementArrayFinder {
    return $$('[data-test-book-title]')
  }

  getElementValue(element: ElementFinder) {
    return element.getAttribute('value')
  }

  getFilterInput(): ElementFinder {
    return $('[data-test-filter-input]')
  }

  navigateTo() {
    return browser.get('/');
  }

  setInputValueInteger(element: ElementFinder, value: number) {
    this.waitUntilElementIsVisible(element)
    element.clear()

    return element.sendKeys(value)
  }

  setInputValueString(element: ElementFinder, value: string) {
    this.waitUntilElementIsVisible(element)
    element.clear()

    return element.sendKeys(value)
  }

  waitUntilElementIsVisible(element: ElementFinder) {
    return browser.wait(ExpectedConditions.visibilityOf(element))
  }
}
