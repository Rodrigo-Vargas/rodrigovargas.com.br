import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Post = defineDocumentType(() => ({
   name: 'Post',
   filePathPattern: `**/*.md`,
   fields: {
      categories: { type: 'list', of: { type: 'string' } },
      excerpt: { type: 'string', required: true },
      locale: { type: 'string', required: false },
      publishedAt: { type: 'date', required: true },
      title: { type: 'string', required: true },
      updatedAt: { type: 'date', required: false}
   },
}))


export default makeSource({ contentDirPath: 'content/posts', documentTypes: [Post] })
