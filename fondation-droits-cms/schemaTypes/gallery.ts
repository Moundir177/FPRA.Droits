import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Galerie',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'categories',
      title: 'Catégories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Légende',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Texte alternatif',
              description: 'Important pour l\'accessibilité et le SEO',
            },
            {
              name: 'location',
              type: 'string',
              title: 'Lieu',
            },
            {
              name: 'date',
              type: 'date',
              title: 'Date',
              options: {
                dateFormat: 'DD-MM-YYYY',
              },
            },
          ],
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'eventName',
      title: 'Nom de l\'événement',
      type: 'string',
    }),
    defineField({
      name: 'eventDate',
      title: 'Date de l\'événement',
      type: 'date',
      options: {
        dateFormat: 'DD-MM-YYYY',
      },
    }),
    defineField({
      name: 'location',
      title: 'Lieu',
      type: 'string',
    }),
    defineField({
      name: 'featured',
      title: 'À la une',
      type: 'boolean',
      description: 'Mettre cette galerie en avant sur la page d\'accueil',
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
      media: 'images.0',
    },
  },
}) 