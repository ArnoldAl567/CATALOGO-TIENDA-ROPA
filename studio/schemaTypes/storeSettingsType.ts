import {defineField, defineType} from 'sanity'

export const storeSettingsType = defineType({
  name: 'storeSettings',
  title: 'Datos de la tienda',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Nombre comercial', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'whatsappNumber', title: 'WhatsApp para pedidos', description: 'Código de país y número, sin + ni espacios. Ejemplo: 51987654321.', type: 'string', validation: (rule) => rule.required().regex(/^\d{10,15}$/, {name: 'número internacional'})}),
    defineField({name: 'email', title: 'Correo de contacto', type: 'string', validation: (rule) => rule.email()}),
    defineField({name: 'instagramUrl', title: 'Instagram', type: 'url'}),
    defineField({name: 'location', title: 'Ubicación', type: 'string'}),
    defineField({name: 'announcement', title: 'Mensaje superior', type: 'string'}),
    defineField({name: 'heroEyebrow', title: 'Texto pequeño de portada', type: 'string'}),
    defineField({name: 'heroTitle', title: 'Título de portada', type: 'string'}),
    defineField({name: 'heroAccent', title: 'Segunda línea destacada', type: 'string'}),
    defineField({name: 'heroDescription', title: 'Descripción de portada', type: 'text', rows: 3}),
    defineField({name: 'heroImage', title: 'Fotografía de portada', type: 'image', options: {hotspot: true}, fields: [defineField({name: 'alt', title: 'Descripción de la imagen', type: 'string'})]}),
  ],
  preview: {select: {title: 'name'}},
})
