import { CollectionConfig } from 'payload/types'

const Users: CollectionConfig = {
  access: {
    create: ({ req: { user } }) => user && user.role === 'admin',
    read: () => true,
    update: ({ req: { user } }) => user && user.role === 'admin',
    delete: ({ req: { user } }) => user && user.role === 'admin',
  },
  slug: 'users',
  labels: {
    singular: 'Потребител',
    plural: 'Потребители',
  },
  auth: {
    maxLoginAttempts: 10,
    lockTime: 600000,
  },
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      type: 'select',
      name: 'role',
      label: 'Роля',
      options: [
        {
          label: 'Редактор',
          value: 'editor',
        },
        {
          label: 'Администратор',
          value: 'admin',
        },
      ],
    }
  ],
  
}

export default Users
