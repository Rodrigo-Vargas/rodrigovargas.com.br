import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Post = defineDocumentType(() => ({
   name: 'Post',
   filePathPattern: `**/*.md`,
   fields: {
      title: { type: 'string', required: true }
   },
}))


export default makeSource({ contentDirPath: 'content/posts', documentTypes: [Post] })
