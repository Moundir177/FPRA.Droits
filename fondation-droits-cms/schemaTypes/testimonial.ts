import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Témoignages',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Rôle / Fonction',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'quote',
      title: 'Citation',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().min(10).max(500),
    }),
    defineField({
      name: 'organization',
      title: 'Organisation',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          {title: 'Défenseurs des droits', value: 'rights-defenders'},
          {title: 'Femmes', value: 'women'},
          {title: 'Jeunes', value: 'youth'},
          {title: 'Communautés', value: 'communities'},
          {title: 'Autre', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'featured',
      title: 'À la une',
      type: 'boolean',
      description: 'Afficher ce témoignage sur la page d\'accueil',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
    }),
    defineField({
      name: 'fullStory',
      title: 'Histoire complète',
      type: 'blockContent',
      description: 'Version longue du témoignage (optionnel)',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
}) 