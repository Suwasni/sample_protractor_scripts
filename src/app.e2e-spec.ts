'use strict'; // necessary for es6 output in node

import { browser, Key } from 'protractor';
import { AppPage } from './app.po'
import { bookDetailsData } from './app.data'

describe('Library App', () => {
  let appPage: AppPage = new AppPage()

  beforeAll(() => {
    return browser.get('/');
  });

  it('app works', () => {
      expect(true).toBeTruthy();
  });

    describe('Book list', () => {
        it('should show the filter input', async () => {
            expect(await appPage.getFilterInput().isPresent()).toBe(true)
        })

        it('should show the list of books', async () => {
          expect(await appPage.getBookListItems().isPresent()).toBe(true)
            
        })

        it('should show 7 books in the list', async () => {
            expect(await appPage.getBookListItems().count()).toEqual(7)
        })        
    })

    describe('Filter book names', () => {
        it('should show the filter by book name', async () => {
            await appPage.setInputValueString(appPage.getFilterInput(), bookDetailsData.fullBookName)

            expect(await (appPage.getBookTitle(0)).getText()).toBe(bookDetailsData.fullBookName)
            expect(await appPage.getBookListItems().count()).toEqual(1)
        })

        it('should show the filter by part of book name', async () => {
            await appPage.setInputValueString(appPage.getFilterInput(), bookDetailsData.partialBookName)

            expect(await (appPage.getBookTitle(0)).getText()).toBe(bookDetailsData.fullBookName)
            expect(await appPage.getBookListItems().count()).toEqual(1)
        })

      it('should show the full list of books when filter input is clear', async () => {
            //The below method to clear the text is not working, so have used the alternative method
            //await appPage.getFilterInput().clear()
            await appPage.getFilterInput().sendKeys((Key.chord(Key.CONTROL, 'a')))
            browser.actions().sendKeys(Key.DELETE).perform()
            expect(await appPage.getBookListItems().count()).toEqual(7)
        })
    })

    describe('delete the book', () => {
      it('should delete the book when delete icon is clicked', async () => {
          var firstBookNameBeforeDelete = appPage.getBookTitle(0).getText()
          await appPage.getBookDeleteIcon(0).click()

          var firstBookNameAfterDelete = appPage.getBookTitle(0).getText()
          expect(await firstBookNameBeforeDelete).not.toEqual(await firstBookNameAfterDelete)
          expect(await appPage.getBookListItems().count()).toEqual(6)
        })
    })

    describe('Book card details', () => {
        it('should show the book card when clicked a book from the book list', async () => {
            await appPage.getBookListItem(0).click()
            await appPage.waitUntilElementIsVisible(appPage.getBookDetailsTitle())

            expect(await appPage.getBookDetailsCard().isPresent()).toBe(true)
        })

        it('should show the title input', async () => {
            expect(await appPage.getBookDetailsTitleInput().isPresent()).toBe(true)
        })

        it('should show the author input', async () => {
            expect(await appPage.getBookDetailsAuthorInput().isPresent()).toBe(true)
        })

        it('should show the publisher input', async () => {
            expect(await appPage.getBookDetailsPublisherInput().isPresent()).toBe(true)
        })

        it('should show the year of publishing input', async () => {
            expect(await appPage.getBookDetailsYearInput().isPresent()).toBe(true)
        })

        it('should show disabled SAVE button', async () => {
            expect(await appPage.getBookDetailsSaveButton().isEnabled()).toBe(false)
        })

        it('should show disabled CANCEL button', async () => {
            expect(await appPage.getBookDetailsCancelButton().isEnabled()).toBe(false)
        })
    })

    describe('Modify book details', () => {
        it('should update the title', async () => {
            await appPage.setInputValueString(appPage.getBookDetailsTitleInput(), bookDetailsData.title)

            expect(await appPage.getElementValue(appPage.getBookDetailsTitleInput())).toEqual(bookDetailsData.title)
        })

        it('should show enabled SAVE button when the form is updated', async () => {
            expect(await appPage.getBookDetailsSaveButton().isEnabled()).toBe(true)
        })

        it('should show enabled CANCEL button when the form is updated', async () => {
            expect(await appPage.getBookDetailsCancelButton().isEnabled()).toBe(true)
        })

        it('should update the author', async () => {
            await appPage.setInputValueString(appPage.getBookDetailsAuthorInput(), bookDetailsData.author)

            expect(await appPage.getElementValue(appPage.getBookDetailsAuthorInput())).toEqual(bookDetailsData.author)
        })

        it('should update the publisher', async () => {
            await appPage.setInputValueString(appPage.getBookDetailsPublisherInput(), bookDetailsData.publisher)

            expect(await appPage.getElementValue(appPage.getBookDetailsPublisherInput())).toEqual(bookDetailsData.publisher)
        })

        it('should update the year of publishing', async () => {
            await appPage.setInputValueInteger(appPage.getBookDetailsYearInput(), bookDetailsData.yearOfPublishing)

            expect(await appPage.getElementValue(appPage.getBookDetailsYearInput())).toEqual(bookDetailsData.yearOfPublishing.toString())
        })

      it('should save the updated details when SAVE button is clicked', async () => {
          await appPage.getBookDetailsSaveButton().click()

          expect(await appPage.getElementValue(appPage.getBookDetailsTitleInput())).toEqual(bookDetailsData.title)
          expect(await appPage.getElementValue(appPage.getBookDetailsAuthorInput())).toEqual(bookDetailsData.author)
          expect(await appPage.getElementValue(appPage.getBookDetailsPublisherInput())).toEqual(bookDetailsData.publisher)
          expect(await appPage.getElementValue(appPage.getBookDetailsYearInput())).toEqual(bookDetailsData.yearOfPublishing.toString())
      })
    })
});
