import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'resource',
  title: 'Ressources',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Image principale',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'categories',
      title: 'Catégories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'Contenu',
      type: 'blockContent',
    }),
    defineField({
      name: 'resourceType',
      title: 'Type de ressource',
      type: 'string',
      options: {
        list: [
          {title: 'Document PDF', value: 'pdf'},
          {title: 'Article', value: 'article'},
          {title: 'Vidéo', value: 'video'},
          {title: 'Guide pratique', value: 'guide'},
          {title: 'Outil juridique', value: 'legal'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fileUrl',
      title: 'URL du fichier',
      type: 'url',
      description: 'Lien vers le fichier à télécharger (si applicable)',
    }),
    defineField({
      name: 'externalUrl',
      title: 'Lien externe',
      type: 'url',
      description: 'Lien vers une ressource externe (si applicable)',
    }),
    defineField({
      name: 'author',
      title: 'Auteur',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      resourceType: 'resourceType',
    },
    prepare(selection) {
      const {title, media, resourceType} = selection
      return {
        title,
        media,
        subtitle: `Ressource: ${resourceType}`,
      }
    },
  },
}) 