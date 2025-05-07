import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'civilSociety',
  title: 'Société Civile',
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
      name: 'organizationType',
      title: 'Type d\'organisation',
      type: 'string',
      options: {
        list: [
          {title: 'ONG', value: 'ngo'},
          {title: 'Association', value: 'association'},
          {title: 'Fondation', value: 'foundation'},
          {title: 'Réseau', value: 'network'},
          {title: 'Initiative', value: 'initiative'},
          {title: 'Autre', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'contactInfo',
      title: 'Informations de contact',
      type: 'object',
      fields: [
        {name: 'email', title: 'Email', type: 'string'},
        {name: 'phone', title: 'Téléphone', type: 'string'},
        {name: 'website', title: 'Site web', type: 'url'},
      ],
    }),
    defineField({
      name: 'location',
      title: 'Localisation',
      type: 'string',
    }),
    defineField({
      name: 'programs',
      title: 'Programmes',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'partners',
      title: 'Partenaires',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      type: 'organizationType',
    },
    prepare(selection) {
      const {title, media, type} = selection
      return {
        title,
        media,
        subtitle: type ? `Type: ${type}` : '',
      }
    },
  },
}) 