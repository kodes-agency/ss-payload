import path from 'path'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload/config'
import seoPlugin from '@payloadcms/plugin-seo';
import Users from './collections/Users'
import { Pages } from './collections/Pages'
import { Media } from './collections/Media'
import { Products } from './collections/Products'
import { News } from './collections/News'
import { Diary } from './collections/Diary'
import { General } from './globals/General'
import { WineType } from './collections/WineType'
import { WineCap } from './collections/WineCap'
import { ProductCategory } from './collections/ProductCategory'
import { Orders } from './collections/Orders'
import { Coupons } from './collections/Coupons'


export default buildConfig({
  admin: {
    dateFormat: 'dd-MM-yyyy',
    user: Users.slug,
    bundler: webpackBundler(),
    webpack: (config) => {
        return {
          ...config,
          resolve: {
            ...config.resolve,
            fallback: {
              ...config.resolve.fallback,
              "stream": false,
              "util": false,
            },
          },
        };
      },
  },
  editor: lexicalEditor(),
  collections: [Users, Pages, Media, Products, News, Diary, WineType, WineCap, ProductCategory, Orders, Coupons],
  globals: [General],
  localization: {
    locales: ['bg', 'en', 'de'],
    defaultLocale: 'bg',
    fallback: true
  },
  
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [
    seoPlugin({
      collections: ['pages'],
      tabbedUI: true,
    }),
  ],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  rateLimit: {
    trustProxy: true,
  }
})
