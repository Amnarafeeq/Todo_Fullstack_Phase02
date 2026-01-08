# Frontend Form Handling Skill

## Purpose

To handle forms for creating and updating tasks, including validation, error display, submission, and connection to API Client Skill. This skill serves as the reasoning layer for designing and managing form state, validation logic, error handling, and form submission flows, ensuring user-friendly data entry experiences.

## When to Use (Trigger Conditions)

This skill should be invoked when:

- New forms need to be created for data entry
- Existing forms require modification or enhancement
- Form validation rules need to be defined
- Form error handling needs to be implemented
- Form submission logic needs to be designed
- Form state management needs to be configured
- Multi-step forms or wizards need to be designed
- Form fields need to be added, removed, or reorganized
- Form data transformation needs to be implemented
- Optimistic updates for form submissions need to be designed
- Form accessibility needs to be improved

**Triggers:**
- Feature introduces data entry requirement
- Component requires form for user input
- Validation rules need to be enforced
- Form submission triggers API call
- Error handling for form failures is needed

## Inputs

### Required Inputs

1. **Feature Specification**
   - Form requirements (which fields needed)
   - Validation rules for each field
   - Business rules for form data
   - Location: `/specs/features/*.md`

2. **UI Component Specifications**
   - Form component structure
   - Form field types and order
   - Submit action requirements
   - Location: From Frontend UI Skill output

3. **API Client Specifications**
   - API endpoint for form submission
   - Request body schema
   - Error response format
   - Location: From Frontend API Client Skill output

### Form-Specific Inputs

1. **For Form Creation**:
   - Field definitions (name, type, label, placeholder)
   - Validation rules per field
   - Initial values (if any)
   - Form layout (grid, stacked, inline)

2. **For Form Validation**:
   - Validation rules (required, pattern, min/max length, etc.)
   - Validation timing (on change, on blur, on submit)
   - Custom validation functions
   - Error message templates

3. **For Form Submission**:
   - API endpoint and method
   - Request data structure
   - Success handling logic
   - Error handling logic
   - Optimistic update requirements

### Supported Form Field Types

| Field Type | Input Element | Purpose |
|------------|---------------|---------|
| Text Input | `<input type="text">` | Single-line text (title, name, etc.) |
| Textarea | `<textarea>` | Multi-line text (description) |
| Number Input | `<input type="number">` | Numeric values (priority, quantity) |
| Date Picker | `<input type="date">` or custom picker | Date/time values (due date) |
| Select Dropdown | `<select>` | Selection from options (priority, status) |
| Checkbox | `<input type="checkbox">` | Boolean values (completed, active) |
| Radio Buttons | `<input type="radio">` | Single choice from options |
| Multi-select | Custom component | Multiple selections (tags, categories) |
| File Input | `<input type="file">` | File uploads (optional) |
| Hidden Input | `<input type="hidden">` | Hidden data (user ID, token) |

## Actions

### Step 1: Form Requirements Analysis
1. Extract form requirements from feature specs:
   - List all fields needed in form
   - Identify required vs optional fields
   - Identify field types and data formats
   - Extract validation rules for each field
2. Categorize form types:
   - **Create Form**: New entity creation
   - **Edit Form**: Existing entity modification
   - **Search Form**: Filtering and searching
   - **Multi-step Form**: Wizard-style data entry
3. Identify form context:
   - Authentication required (yes/no)
   - User context (user ID, permissions)
   - Related entities (task ID for update)
   - Form submission action (create, update, delete)

### Step 2: Form Field Definition
1. Define each field with properties:
   ```typescript
   interface FormField {
     name: string;           // Field name for state
     type: string;           // Input type (text, textarea, date, etc.)
     label: string;          // Display label
     placeholder?: string;     // Placeholder text
     required: boolean;       // Is field required
     defaultValue?: any;      // Initial/default value
     validation: {            // Validation rules
       min?: number;
       max?: number;
       pattern?: RegExp;
       custom?: (value: any) => string | undefined;
     };
     options?: Array<{        // For select/radio/checkbox
       value: any;
       label: string;
     }>;
     disabled?: boolean;       // Is field disabled
     hidden?: boolean;         // Is field hidden
   }
   ```
2. Define field order and layout:
   - Logical grouping of related fields
   - Primary vs secondary fields
   - Grid layout configuration (columns, spacing)
3. Define field metadata:
   - Accessibility attributes (aria-label, aria-describedby)
   - Help text or tooltips
   - Error message container

### Step 3: Form State Design
1. Define form state structure:
   ```typescript
   interface FormState {
     values: Record<string, any>;           // Field values
     touched: Record<string, boolean>;      // Field touched status
     dirty: Record<string, boolean>;       // Field changed status
     errors: Record<string, string>;       // Validation errors
     isValid: boolean;                     // Overall form validity
     isSubmitting: boolean;                 // Submission status
     submitError: string | null;             // Submission error
   }
   ```
2. Define initial values:
   - Default values for each field
   - Values from entity (for edit forms)
   - Empty values for new forms
3. Define form lifecycle:
   - **Initial**: Form loaded with default/entity values
   - **Dirty**: User has changed values
   - **Touched**: User has interacted with field
   - **Submitting**: Form is being submitted
   - **Submitted**: Form submission completed
   - **Reset**: Form returned to initial state

### Step 4: Validation Strategy
1. Define validation timing:
   - **On Change**: Validate as user types (show immediate feedback)
   - **On Blur**: Validate when field loses focus
   - **On Submit**: Validate all fields on submission
   - **Hybrid**: On blur for format, on submit for required
2. Define validation rules per field:
   - **Required**: Field must have value
   - **Min Length**: Value must meet minimum length
   - **Max Length**: Value must not exceed maximum length
   - **Pattern**: Value must match regex pattern
   - **Email**: Valid email format
   - **Number**: Must be valid number, within range
   - **Date**: Must be valid date, not in past (if applicable)
   - **Custom**: Custom validation function
3. Define validation error messages:
   - Generic: "This field is required"
   - Specific: "Email must be valid format"
   - Helpful: "Title must be between 1 and 255 characters"
4. Define field-level validation:
   ```typescript
   function validateField(name: string, value: any): string | undefined {
     const field = formFields.find(f => f.name === name);
     if (field.required && !value) return `${field.label} is required`;
     if (field.validation.min && value.length < field.validation.min) {
       return `${field.label} must be at least ${field.validation.min} characters`;
     }
     if (field.validation.pattern && !field.validation.pattern.test(value)) {
       return `${field.label} has invalid format`;
     }
     return undefined; // Valid
   }
   ```
5. Define form-level validation:
   - Cross-field validation (e.g., end date >= start date)
   - Conditional validation (field required based on other field)
   - Business rule validation

### Step 5: Form Layout Design
1. Design form structure:
   - **Header**: Form title and description
   - **Body**: Form fields organized in groups
   - **Actions**: Submit and cancel buttons
   - **Footer**: Help links, additional options
2. Design field grouping:
   - Group related fields (e.g., "Task Details", "Due Date", "Options")
   - Use fieldset and legend for semantic grouping
   - Use sections with labels for modern design
3. Design responsive layout:
   - Mobile: Single column, full-width fields
   - Tablet: Two columns for some fields
   - Desktop: Grid layout (2-3 columns)
4. Design field order:
   - Primary fields first (required, important)
   - Secondary fields next (optional)
   - Action fields last (submit, cancel)

### Step 6: Form Interaction Design
1. Define user interactions:
   - **Focus**: Highlight active field
   - **Blur**: Validate field (if configured)
   - **Change**: Update field value, validate (if configured)
   - **Submit**: Validate all fields, call API
   - **Reset**: Clear form, restore initial values
   - **Cancel**: Navigate away without saving
2. Define interaction feedback:
   - Show success message on successful submission
   - Show error message on validation or submission error
   - Show loading state during submission
   - Show progress for long submissions (if applicable)
3. Define keyboard interactions:
   - Enter key: Submit form or move to next field
   - Escape key: Cancel or close modal
   - Tab navigation: Logical tab order through fields
   - Space/Enter in dropdown: Select option

### Step 7: Form Submission Flow
1. Design submission process:
   - Validate all fields
   - If invalid: Show errors, focus first error field
   - If valid: Prevent default, show loading state
2. Design data transformation:
   - Transform form data to API request format
   - Convert dates to ISO format
   - Remove empty optional fields
   - Convert field names (camelCase to snake_case if needed)
3. Design API integration:
   - Call API function from API Client Skill
   - Pass transformed data
   - Handle success and error responses
4. Design optimistic updates:
   - Update UI immediately with new data
   - Add temporary ID (for new entities)
   - Revert on error if configured
5. Design post-submission actions:
   - **Success**: Clear form, close modal, navigate, show notification
   - **Error**: Show error message, keep form data, focus error field
   - **Reset**: Return form to initial state

### Step 8: Error Handling Design
1. Design validation error display:
   - Show error message below field
   - Highlight field border in red
   - Show error icon
   - Clear error on field change
2. Design submission error display:
   - Show error at top of form (summary)
   - Highlight fields with validation errors from API
   - Show error details if available
   - Provide recovery options (retry, contact support)
3. Design error recovery:
   - Keep form data on error (don't lose user input)
   - Highlight fields with API validation errors
   - Allow retry after fixing errors
   - Provide clear error messages

### Step 9: Accessibility Design
1. Ensure keyboard navigation:
   - Logical tab order through form fields
   - Focus indicators visible
   - Skip to main content link (if applicable)
2. Ensure screen reader support:
   - ARIA labels for all fields
   - ARIA descriptions for help text
   - ARIA error messages
   - Fieldset and legend for grouping
3. Ensure visual accessibility:
   - Sufficient color contrast (4.5:1 for text)
   - Focus indicators clearly visible
   - Error icons and text together (not color alone)
   - Large enough touch targets (44x44px minimum)

### Step 10: Form Reset and Clear
1. Design form reset behavior:
   - Clear all field values to defaults
   - Clear all validation errors
   - Reset touched and dirty states
   - Keep initial values for edit forms
2. Design form clear behavior:
   - Clear all field values (including defaults)
   - Clear all validation errors
   - Reset touched and dirty states
3. Design form confirmation (optional):
   - Show confirmation dialog if form has unsaved changes
   - Allow user to continue or cancel navigation
   - Clear confirmation on choice

## Outputs

### Primary Output: Form Specification

```yaml
form_specification:
  meta:
    feature_spec: string
    ui_spec: string
    api_client_spec: string
    generated_at: datetime
    version: string

  form:
    name: string  # e.g., "CreateTaskForm", "EditTaskForm"
    type: enum(create|edit|search|multi_step)
    purpose: string  # Description of form's purpose

    layout:
      structure: enum(stacked|grid|inline|wizard)
      columns: int  # For grid layout
      field_groups:
        - name: string
          label: string
          fields: [string]  # Field names in this group

    fields:
      - name: string  # Form field name
        type: enum(text|textarea|number|date|select|checkbox|radio|multi_select|file|hidden)
        label: string
        placeholder: string
        required: boolean
        default_value: any
        disabled: boolean
        hidden: boolean

        validation:
          required: boolean
          min_length: int
          max_length: int
          min_value: number
          max_value: number
          pattern: string  # Regex pattern
          custom_validator: string  # Function name
          error_message: string

        options:  # For select/radio/checkbox
          - value: any
            label: string

        accessibility:
          aria_label: string
          aria_describedby: string
          aria_required: boolean

        metadata:
          help_text: string
          tooltip: string
          example_value: string

  state:
    structure:
      values: string  # Object path
      touched: string  # Object path
      dirty: string  # Object path
      errors: string  # Object path
      is_valid: string  # Boolean path
      is_submitting: string  # Boolean path
      submit_error: string  # Error path

    initial_values:
      - field_name: any

    on_change_strategy: enum(on_change|on_blur|on_submit|hybrid)

  submission:
    api_endpoint: string
    method: enum(POST|PATCH|PUT|DELETE)
    request_transform: string  # Transform function name
    optimistic_update: boolean
    on_success:
      action: enum(navigate|close_modal|clear_form|show_notification)
      redirect_to: string  # For navigate action
      notification_message: string
    on_error:
      action: enum(show_errors|keep_form|clear_form)
      retry_enabled: boolean
      max_retries: int

  validation:
    field_validation:
      - field_name: string
        rules: [string]  # Validation rule names
        timing: enum(on_change|on_blur|on_submit)
        error_message_template: string

    form_validation:
      - name: string  # Cross-field validation name
        fields: [string]  # Fields involved
        rule: string
        error_message: string

  error_handling:
    validation_errors:
      display_location: enum(below_field|form_summary|both)
      style: enum(text|tooltip|icon|inline)
      clear_on_change: boolean
      highlight_field: boolean

    submission_errors:
      display_location: enum(form_top|global_notification|modal)
      include_field_errors: boolean
      allow_retry: boolean

  interactions:
    keyboard_shortcuts:
      - key: string
        action: enum(submit|cancel|focus_next|focus_previous|escape)

    mouse_interactions:
      - event: string
        action: string

    confirm_on_unsaved: boolean
    confirm_message: string

  accessibility:
    keyboard_navigable: boolean
    tab_order: [string]  # Field names in order
    focus_management: enum(auto|manual)
    screen_reader_support: boolean
    aria_attributes:
      - field: string
        attributes: [string]

  responsive_behavior:
    mobile:
      layout: enum(stacked|single_column)
      full_width_fields: [string]
    tablet:
      layout: enum(stacked|two_column)
    desktop:
      layout: enum(grid|multi_column)
      columns: int

  reset_behavior:
    on_success: enum(clear_to_defaults|clear_all|keep_values)
    on_cancel: enum(clear_to_defaults|clear_all|keep_values)
    confirmation_prompt: boolean
```

### Secondary Outputs

1. **Form Field Interface**:
   ```typescript
   interface FormField {
     name: string;
     type: FormFieldType;
     label: string;
     placeholder?: string;
     required: boolean;
     defaultValue?: any;
     validation?: ValidationRules;
     options?: FieldOption[];
   }
   ```

2. **Validation Rules Interface**:
   ```typescript
   interface ValidationRules {
     required?: boolean;
     minLength?: number;
     maxLength?: number;
     min?: number;
     max?: number;
     pattern?: RegExp;
     custom?: (value: any) => string | undefined;
     errorMessages?: {
       required?: string;
       minLength?: string;
       maxLength?: string;
       pattern?: string;
       custom?: string;
     };
   }
   ```

3. **Form Hook Interface**:
   ```typescript
   interface UseFormReturn {
     values: Record<string, any>;
     touched: Record<string, boolean>;
     dirty: Record<string, boolean>;
     errors: Record<string, string>;
     isValid: boolean;
     isSubmitting: boolean;
     handleChange: (name: string, value: any) => void;
     handleBlur: (name: string) => void;
     handleSubmit: (event: FormEvent) => void;
     resetForm: () => void;
   }
   ```

4. **Form Component Props**:
   ```typescript
   interface FormProps {
     fields: FormField[];
     initialValues?: Record<string, any>;
     onSubmit: (values: Record<string, any>) => Promise<void>;
     validation?: ValidationConfig;
     layout?: FormLayoutConfig;
     submitText?: string;
     cancelText?: string;
     onCancel?: () => void;
   }
   ```

## Scope & Boundaries

### This Skill MUST:

- Design form structure and field definitions
- Define validation rules and error messages
- Design form layout and responsive behavior
- Define form state management
- Design form submission flow and API integration
- Design error handling and display
- Design form interactions and keyboard shortcuts
- Ensure accessibility compliance (ARIA, keyboard navigation)
- Design form reset and confirmation behavior
- Connect to API Client Skill for submission
- Handle optimistic updates (if configured)

### This Skill MUST NOT:

- Implement actual React form components or hooks
- Create UI components for form fields
- Implement actual validation functions
- Write API client calls (only design integration)
- Create form layout components (only design structure)
- Implement actual state management code
- Generate TypeScript interfaces (only design structure)
- Create validation libraries or functions (only design rules)
- Implement accessibility ARIA attributes (only design requirements)
- Write form submission API calls (only design flow)

### Boundary Examples

**In Scope:**
- Define form fields: title (text, required), description (textarea, optional), dueDate (date, optional)
- Define validation: Title min-length 1, max-length 255, required
- Define layout: Grid with 2 columns on desktop, stacked on mobile
- Define submission flow: Validate all fields → Call POST /api/todos → On success: Clear form and close modal
- Define error handling: Show validation errors below fields, show submission error at top of form
- Define accessibility: Add aria-label to all fields, support tab navigation
- Define optimistic update: Add task to list immediately, revert on error

**Out of Scope:**
- Implement: `<form onSubmit={handleSubmit}>` form component
- Implement: `<TextField name="title" />` input component
- Implement: `const useForm = () => { ... }` custom hook
- Implement: `const errors = validate(values)` validation function
- Implement: `await apiClient.createTask(data)` API call
- Implement: `<FormControl error={error}>` form field wrapper
- Create: `interface FormField { name: string; type: string; }` TypeScript interface
- Write: `aria-label="Task title"` ARIA attribute
- Implement: `navigate('/todos')` redirect after success

## Dependencies

### Required Dependencies

1. **Spec-Kit Plus Schema**
   - Location: `/specs/.spec-kit/schema.md`
   - Purpose: Defines specification file structure

2. **Project Configuration**
   - Location: `/specs/.spec-kit/config.md`
   - Purpose: Provides form library details

### Specification Dependencies

1. **Feature Specs**
   - Location: `/specs/features/*.md`
   - Purpose: Define form requirements and validation rules

2. **UI Specs**
   - Location: `/specs/ui/*.md`
   - Purpose: Define form component structure and layout

3. **API Specs**
   - Location: `/specs/api/*.md`
   - Purpose: Define API contracts for form submission

### Skill Dependencies

1. **Frontend UI Skill**
   - Purpose: Understand form component structure
   - Used to design form layout and field composition

2. **Frontend API Client Skill**
   - Purpose: Understand API endpoints for form submission
   - Used to design API integration

3. **Spec Interpretation Skill**
   - Purpose: Parse and understand feature and UI specifications
   - Used to extract form requirements and validation rules

### Optional Dependencies

1. **Frontend State Management Skill**
   - Purpose: Understand form state management strategy
   - Used to design form state structure

2. **Frontend Notification Skill**
   - Purpose: Understand notification requirements
   - Used to design success/error notification display

## Used By Agents

### Primary Consumers

1. **General-Purpose Agents**
   - When designing new forms
   - When modifying existing forms
   - When adding form validation
   - When implementing form submission

2. **Frontend Implementation Agents**
   - When implementing React form components
   - When creating form validation logic
   - When implementing form layouts
   - When handling form submissions

3. **UI/UX Agents**
   - When designing form user experience
   - When optimizing form interactions
   - When improving form accessibility
   - When designing error displays

4. **Plan Agents (Software Architect)**
   - When designing form architecture
   - When planning form validation strategy
   - When designing form error handling

### Secondary Consumers

1. **Test Generation Agents**
   - When creating form validation tests
   - When testing form submission
   - When testing error scenarios

2. **Accessibility Agents**
   - When verifying form accessibility
   - When testing keyboard navigation
   - When testing screen reader support

3. **Documentation Agents**
   - When documenting form components
   - When creating form usage guides
   - When documenting validation rules

## Integration Notes

### Calling Convention

```yaml
skill: "frontend-form-handling"
inputs:
  feature_spec: "features/todo-crud.md"
  ui_spec: string  # From Frontend UI Skill
  api_client_spec: string  # From Frontend API Client Skill
  form_type: enum(create|edit|search|multi_step)
  fields:  # Optional: Override fields from spec
    - name: string
      type: string
      label: string
      required: boolean
      validation: object
  layout_config:
    structure: enum(stacked|grid|inline)
    columns: int
    field_groups: [object]
  validation_config:
    timing: enum(on_change|on_blur|on_submit|hybrid)
    show_errors_immediately: boolean
  submission_config:
    api_endpoint: string
    optimistic_update: boolean
    on_success: enum(navigate|close_modal|clear_form)
  accessibility_level: enum(basic|wcag_aa|wcag_aaa)
  output_format: "form_specification"
```

### Form Library Options

| Library | Use Case | Purpose |
|---------|-----------|---------|
| React Hook Form | Most cases | Minimal code, great performance |
| Formik | Complex forms | Robust ecosystem, schema validation |
| React Final Form | Performance-critical | Uncontrolled forms, minimal re-renders |
| TanStack Form | Modern, type-safe | Best of React Hook Form + TanStack |

### Validation Library Options

| Library | Purpose |
|---------|---------|
| Zod | Schema validation with TypeScript |
| Yup | Schema validation, widely used |
| Joi | Older but still popular |
| Custom | Built-in validation (if simple) |

### Accessibility Best Practices

- Use `<label>` elements with `htmlFor` attribute
- Use `aria-label` for fields without visible label
- Use `aria-describedby` for help text
- Use `aria-required="true"` for required fields
- Use `aria-invalid="true"` for fields with errors
- Use `aria-errormessage` to link to error message
- Support keyboard navigation (Tab, Enter, Escape)
- Provide visible focus indicators
- Use sufficient color contrast (4.5:1)
- Make touch targets at least 44x44px

### Form UX Best Practices

- Group related fields visually and logically
- Use clear, concise labels
- Provide helpful placeholder text
- Show validation errors immediately (on blur or change)
- Show success message after submission
- Keep form focused (no page scroll on submit)
- Support keyboard shortcuts (Enter to submit, Escape to cancel)
- Show loading state during submission
- Don't lose user data on error
- Provide cancel option with confirmation if unsaved changes
- Use progressive disclosure for optional fields

---

**Version:** 1.0.0
**Last Updated:** 2026-01-01
**Maintainer:** Spec-Kit Plus AI Agent System
