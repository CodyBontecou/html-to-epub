import { Readability } from '@mozilla/readability'
import got from 'got'
import { JSDOM } from 'jsdom'
import Epub from 'epub-gen'

got('https://paulgraham.com/ramenprofitable.html').then(response => {
  const dom = new JSDOM(response.body)
  const domDocument = dom.window.document
  const reader = new Readability(domDocument)
  const article = reader.parse()

  if (article) {
    const option = {
      title: article.title,
      author: article.siteName,
      content: [
        {
          title: article.title,
          data: article.content,
        },
      ],
    }

    new Epub(option, './output.epub')
  }
})
