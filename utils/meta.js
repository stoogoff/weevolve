
const type = 'website'
const url = 'https://we-evolve.co.uk'
const title = 'we evolve'
const description = 'Publisher of the Aegean and WILD role-playing games. Funding for Aegean is now live on Kickstarter.'
const image = '/img/kickstarter-banner.png'

export default (meta) => {
	const newTitle = (meta && meta.title) || title
	const combinedUrl = meta && meta.url ? `${url}${meta.url}` : url
	const newImage = `${url}${(meta && meta.image) || image}`

  return [
    {
      hid: 'description',
      name: 'description',
      content: (meta && meta.description) || description,
    },
    {
      hid: 'og:type',
      property: 'og:type',
      content: (meta && meta.type) || type,
    },
    {
      hid: 'og:url',
      property: 'og:url',
      content: combinedUrl,
    },
    {
      hid: 'og:title',
      property: 'og:title',
      content: newTitle,
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content: (meta && meta.description) || description,
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: newImage,
    },
    {
      hid: 'twitter:url',
      name: 'twitter:url',
      content: combinedUrl,
    },
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: newTitle,
    },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content: (meta && meta.description) || description,
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: newImage,
    },
  ]
}