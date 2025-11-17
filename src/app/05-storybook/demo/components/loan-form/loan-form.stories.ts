import type { Meta, StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';
import { within, userEvent, expect, waitFor } from 'storybook/test';
import { LoanFormComponent } from './loan-form';
import { MOCK_BOOKS } from '../mock-data';

const meta: Meta<LoanFormComponent> = {
  title: 'Library/LoanForm',
  component: LoanFormComponent,
  tags: ['autodocs'],
  argTypes: {
    book: { control: 'object' },
    disabled: { control: 'boolean' },
  },
  args: {
    loanSubmit: fn(),
    cancel: fn(),
  },
};

export default meta;
type Story = StoryObj<LoanFormComponent>;

export const EmptyForm: Story = {
  args: {
    book: MOCK_BOOKS[0],
    disabled: false,
  },
};

export const FilledForm: Story = {
  args: {
    book: MOCK_BOOKS[0],
    disabled: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Fill in the form
    const nameInput = canvas.getByRole('textbox', { name: /שם מלא/i });
    const emailInput = canvas.getByRole('textbox', { name: /אימייל/i });
    const phoneInput = canvas.getByRole('textbox', { name: /טלפון/i });

    await userEvent.type(nameInput, 'ישראל ישראלי');
    await userEvent.type(emailInput, 'israel@example.com');
    await userEvent.type(phoneInput, '050-1234567');

    // Verify the inputs are filled
    await expect(nameInput).toHaveValue('ישראל ישראלי');
    await expect(emailInput).toHaveValue('israel@example.com');
    await expect(phoneInput).toHaveValue('050-1234567');
  },
};

export const WithValidationErrors: Story = {
  args: {
    book: MOCK_BOOKS[0],
    disabled: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Try to submit without filling the form
    const submitButtons = canvas.getAllByRole('button');
    const submitButton = submitButtons.find(btn => btn.getAttribute('aria-label')?.includes('השאל'));

    if (submitButton) {
      await userEvent.click(submitButton);
    }

    // Wait for validation errors to appear
    await waitFor(async () => {
      const errorMessages = canvas.queryAllByRole('alert');
      expect(errorMessages.length).toBeGreaterThan(0);
    });
  },
};

export const DisabledState: Story = {
  args: {
    book: MOCK_BOOKS[0],
    disabled: true,
  },
};

// Bonus: Interactive Form Submission
export const InteractiveFormSubmission: Story = {
  args: {
    book: MOCK_BOOKS[0],
    disabled: false,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Fill in all required fields
    const nameInput = canvas.getByRole('textbox', { name: /שם מלא/i });
    const emailInput = canvas.getByRole('textbox', { name: /אימייל/i });

    // Type and trigger blur to ensure form validation
    await userEvent.type(nameInput, 'דני לוי');
    await userEvent.tab(); // Move to next field

    await userEvent.type(emailInput, 'danny@example.com');
    await userEvent.tab(); // Blur the email field

    // Wait for Angular change detection and validation
    await new Promise(resolve => setTimeout(resolve, 300));

    // Submit the form
    const submitButtons = canvas.getAllByRole('button');
    const submitButton = submitButtons.find(btn => btn.getAttribute('aria-label')?.includes('השאל'));

    if (submitButton) {
      await userEvent.click(submitButton);
    }

    // Wait for the async submission (component has 500ms delay)
    await waitFor(
      async () => {
        expect(args.loanSubmit).toHaveBeenCalledWith({
          name: 'דני לוי',
          email: 'danny@example.com',
          phone: undefined,
        });
      },
      { timeout: 2000 }
    );
  },
};
