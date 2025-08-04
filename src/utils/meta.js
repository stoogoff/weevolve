
const OG_TYPE = 'website'
const BASE_URL = 'https://we-evolve.co.uk'
const BASE_TITLE = 'we evolve'
const BASE_DESCRIPTION = 'Publisher of the Aegean, WILD, and Action Potential role-playing games.'
const BASE_IMAGE = `https://cdn.we-evolve.co.uk/img/home/banner-aegean.png`

export const title = meta => meta && meta.title ? `${meta.title} | we evolve` : BASE_TITLE

export const url = meta => meta && meta.url ? `${BASE_URL}${meta.url}` : `${BASE_URL}/`

export const image = meta => meta && meta.image ? `${BASE_URL}${meta.image}` : BASE_IMAGE
 
export const meta = meta => {
	const newTitle = title(meta)
	const combinedUrl = url(meta)
	const newImage = image(meta)
	const newDescription = (meta && meta.description) || BASE_DESCRIPTION

	return [
		{
			hid: 'description',
			name: 'description',
			content: newDescription,
		},
		{
			hid: 'og:type',
			property: 'og:type',
			content: (meta && meta.type) || OG_TYPE,
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
			content: newDescription,
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
			content: newDescription,
		},
		{
			hid: 'twitter:image',
			name: 'twitter:image',
			content: newImage,
		},
	]
}