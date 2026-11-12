import { config, fields, singleton } from '@keystatic/core';

// Where the admin saves content:
// - `npm run dev`: local storage. Saving writes straight to the files on disk,
//   no sign-in needed, and you commit the changes yourself.
// - The deployed site (domain.com/keystatic): Keystatic Cloud. Editors sign in
//   with their keystatic.cloud account, and each save becomes a commit on the
//   GitHub repo. That commit triggers a new Cloudflare build, so the change
//   goes live a minute or two later.
//
// Replace the value below with your Keystatic Cloud project, written as
// "team-slug/project-slug" (shown in the project's URL on keystatic.cloud).
const KEYSTATIC_CLOUD_PROJECT = 'your-team/your-project';

export default config({
  storage: import.meta.env.DEV ? { kind: 'local' } : { kind: 'cloud' },
  cloud: {
    project: KEYSTATIC_CLOUD_PROJECT,
  },
  ui: {
    brand: { name: 'Links page' },
  },
  singletons: {
    profile: singleton({
      label: 'Profile',
      path: 'src/content/profile',
      format: 'json',
      schema: {
        name: fields.text({
          label: 'Name',
          validation: { length: { min: 1 } },
        }),
        bio: fields.text({
          label: 'Bio',
          multiline: true,
        }),
        avatar: fields.image({
          label: 'Avatar',
          description: 'Optional. A placeholder image is shown when this is empty.',
          directory: 'public/images/avatar',
          publicPath: '/images/avatar/',
        }),
        links: fields.array(
          fields.object({
            label: fields.text({
              label: 'Label',
              validation: { length: { min: 1 } },
            }),
            href: fields.text({
              label: 'URL',
              description: 'A full URL (https://…) or mailto:you@example.com',
              validation: { length: { min: 1 } },
            }),
            icon: fields.image({
              label: 'Icon',
              description: 'Optional. Shown to the left of the label. A square image (SVG or PNG) works best.',
              directory: 'public/images/icons',
              publicPath: '/images/icons/',
            }),
          }),
          {
            label: 'Links',
            itemLabel: (props) => props.fields.label.value || 'New link',
          },
        ),
      },
    }),
  },
});
