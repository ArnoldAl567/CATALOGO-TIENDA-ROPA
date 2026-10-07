import {defineField, defineType} from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Categoría',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Nombre', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'slug', title: 'Identificador para enlaces', type: 'slug', options: {source: 'name'}, validation: (rule) => rule.required()}),
    defineField({name: 'description', title: 'Descripción breve', type: 'string'}),
    defineField({name: 'image', title: 'Imagen de la categoría', type: 'image', options: {hotspot: true}, fields: [defineField({name: 'alt', title: 'Descripción de la imagen', type: 'string'})]}),
    defineField({name: 'sortOrder', title: 'Orden en el catálogo', type: 'number', initialValue: 0, validation: (rule) => rule.min(0)}),
  ],
  preview: {select: {title: 'name', subtitle: 'description', media: 'image'}},
})
