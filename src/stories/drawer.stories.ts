import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { DrawerStorybookComponent } from './drawer-storybook.component';

const meta: Meta<DrawerStorybookComponent> = {
  title: 'Drawer',
  component: DrawerStorybookComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule],
    }),
  ],
  render: (args: DrawerStorybookComponent) => ({
    props: {
      ...args
    },
  }),
  argTypes: {
    position: {
      options: ['top', 'right', 'bottom', 'left'],
      control: { type: 'radio' },
      description: 'Set position where drawer is displayed',
      defaultValue: '',
      type: 'string',
    },
    closeIcon: {
      type: 'boolean',
      description: 'Determine whether show close icon',
      defaultValue: true,
    },
    content: {
      type: 'string',
      description: "HTML content of drawer's body",
    },
    width: {
      type: 'string',
      description: 'Width of drawer when position is left or right',
    },
    height: {
      type: 'string',
      description: 'Height of drawer when position is top or bottom',
    },
  },
};

export default meta;
type Story = StoryObj<DrawerStorybookComponent>;

export const Default: Story = {
  args: {
    content: `<p>Some Content</p>`,
    position: 'right',
    width: '70%',
    closeIcon: true,
    height: '70%',
  },
};
