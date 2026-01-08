# Frontend Notification Skill

## Purpose

To show UI messages (success/error/info) and browser notifications for task reminders. This skill serves as the reasoning layer for designing and managing in-app toast notifications, banners, alerts, and browser-based system notifications, ensuring users receive timely feedback and reminders.

## When to Use (Trigger Conditions)

This skill should be invoked when:

- UI feedback is needed for user actions (success, error, info)
- Browser notifications need to be requested or displayed
- Toast notification queue needs to be managed
- In-app banners or alerts need to be shown
- Task reminders need to trigger browser notifications
- Notification preferences need to be applied
- Notification history needs to be displayed
- Notification dismissal or clearing is required
- Multiple notifications need to be batched or stacked
- Persistent notifications need to be managed

**Triggers:**
- User completes an action (create, update, delete task)
- API call succeeds or fails
- Task reminder is triggered
- User requests to view notification history
- Notification preferences change
- System events (session timeout, connection lost)

## Inputs

### Required Inputs

1. **Notification Event Data**
   - Notification type (success, error, info, warning)
   - Message text
   - Duration (auto-dismiss time)
   - Actions (buttons, links)
   - User context (user ID, session ID)

2. **Browser Notification Data**
   - Notification title and body
   - Icon URL
   - Notification type (reminder, alert, etc.)
   - Action buttons

3. **Notification Preferences**
   - In-app notifications enabled/disabled
   - Browser notifications enabled/disabled
   - Sound enabled/disabled
   - Notification position (top-right, top-left, etc.)

### Supported Notification Types

| Notification Type | Display | Purpose |
|------------------|---------|---------|
| Success | Toast | Action completed successfully |
| Error | Toast/Modal | Action failed with error |
| Info | Toast/Banner | Informational message |
| Warning | Banner/Toast | Potential issue or warning |
| Browser Notification | System OS | Task reminders, important alerts |

## Actions

### Step 1: Notification Type Determination

1. Determine notification category:
   - **Success**: Action completed successfully (task created, updated, deleted)
   - **Error**: Action failed (validation error, API error, network error)
   - **Info**: General information (notification, tips, help)
   - **Warning**: Potential issue (overdue task, connection issue)

2. Determine notification severity:
   - **Critical**: System errors, data loss, security issues
   - **High**: Important action failures, overdue tasks
   - **Medium**: General information, warnings
   - **Low**: Info messages, tips

3. Determine notification display method:
   - **Toast**: Auto-dismissing overlay (success, error, info)
   - **Modal**: User acknowledgment required (errors, confirmations)
   - **Banner**: Persistent message at top/bottom of screen
   - **Browser Notification**: System notification (reminders)

### Step 2: Toast Notification Design

1. Design toast structure:
   - Icon (success checkmark, error X, info i, warning triangle)
   - Title (summary message)
   - Message (detailed description)
   - Action button (optional)
   - Close button
   - Progress bar (optional, for timed notifications)

2. Design toast positioning:
   - Positions: top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
   - Stacking behavior: new toasts stack, oldest auto-dismisses
   - Maximum toasts visible at once (e.g., 3-5)

3. Design toast duration:
   - Success: 3-5 seconds
   - Error: 5-8 seconds (or until dismissed)
   - Info: 4-6 seconds
   - Warning: 5-7 seconds
   - Manual dismiss: User can dismiss anytime

### Step 3: Notification Queue Management

1. Manage notification queue:
   - Add new notifications to queue
   - Remove dismissed/timeout notifications
   - Track active notifications (displayed)
   - Track queue size limit (max N notifications)

2. Manage toast stacking:
   - New toasts push to stack
   - Auto-dismiss from queue bottom when limit reached
   - Maintain order (oldest first)

3. Manage concurrent notifications:
   - Display multiple toasts side-by-side or stacked
   - Limit total visible toasts
   - Prioritize higher severity notifications

### Step 4: Error Notification Handling

1. Design error notifications:
   - Show error icon (red X or triangle)
   - Display error message (user-friendly)
   - Include error code (optional, for debugging)
   - Add action buttons (retry, dismiss)
   - Make persistent (no auto-dismiss for critical errors)

2. Handle API errors:
   - Show error message from API response
   - Show validation errors with field references
   - Suggest retry for transient errors
   - Show generic message for unknown errors

3. Handle network errors:
   - Show "Connection error" message
   - Suggest checking internet connection
   - Provide retry button
   - Show offline indicator (persistent)

4. Handle validation errors:
   - Show field-specific errors in form
   - Highlight invalid fields
   - Show error toast with summary

### Step 5: Success Notification Handling

1. Design success notifications:
   - Show success icon (green checkmark)
   - Display success message
   - Keep duration short (3-5 seconds)
   - Auto-dismiss unless user interacts

2. Handle action confirmations:
   - "Task created successfully"
   - "Task updated successfully"
   - "Task deleted"
   - "Task completed"

3. Add action links (optional):
   - "View task" button for created/updated tasks
   - "Undo" button for deletions (if available)

### Step 6: Info/Warning Notification Handling

1. Design info notifications:
   - Show info icon (blue i)
   - Display informational message
   - Medium duration (4-6 seconds)
   - Auto-dismiss unless important

2. Design warning notifications:
   - Show warning icon (yellow triangle)
   - Display warning message
   - Longer duration (5-7 seconds)
   - May require acknowledgment

3. Handle system warnings:
   - "Task overdue" warnings
   - "Session expiring soon" warnings
   - "Unsaved changes" warnings

### Step 7: Banner Notification Design

1. Design banner structure:
   - Full-width or partial-width banner
   - Position: top or bottom of screen
   - Dismissible (X button or click to dismiss)
   - Color-coded by type (success=green, error=red, info=blue, warning=yellow)
   - Action button (optional)

2. Banner use cases:
   - **Announcements**: New features, maintenance
   - **System alerts**: Server issues, maintenance windows
   - **Persistent errors**: Connection lost, session expired
   - **Important reminders**: Overdue tasks, upcoming deadlines

3. Banner persistence:
   - Persist across page navigations
   - Show until dismissed
   - Store dismissed state (don't show again)

### Step 8: Browser Notification Integration

1. Request browser permission:
   - Show permission request on first notification
   - Explain why notifications are needed
   - Handle permission granted/denied
   - Store permission state

2. Display browser notifications:
   - Show notification with title and body
   - Include icon (app icon or task-specific)
   - Add action buttons (view, dismiss, complete)
   - Set timeout (auto-dismiss after N seconds)

3. Handle browser notification events:
   - **Click**: Navigate to related page (task detail)
   - **Dismiss**: Clear notification, mark as read
   - **Action**: Handle action button click (complete, snooze)
   - **Close**: Handle notification close

4. Integrate with task reminders:
   - Trigger browser notification for due date reminders
   - Trigger browser notification for overdue alerts
   - Trigger browser notification for recurring task instances
   - Respect user notification preferences (timing, sound)

### Step 9: Notification Actions

1. Define notification actions:
   - **Retry**: Retry failed action
   - **View**: Navigate to related resource (task detail)
   - **Dismiss**: Close notification
   - **Undo**: Revert last action (if available)
   - **Complete**: Mark task as complete (for task reminders)
   - **Snooze**: Remind again later

2. Design action buttons:
   - Primary action: Main button (Retry, View, Complete)
   - Secondary action: Secondary button (Dismiss, Snooze)
   - Icon buttons: Small icon-only buttons

3. Handle action execution:
   - Execute action (API call, navigation, state update)
   - Dismiss notification on action
   - Show new notification if action succeeds/fails

### Step 10: Notification State Management

1. Define notification state structure:
   ```typescript
   interface NotificationState {
     notifications: Notification[];
     maxVisible: number;
     queue: Notification[];
     browserPermission: NotificationPermission;
     browserEnabled: boolean;
     soundEnabled: boolean;
   }
   ```

2. Define notification structure:
   ```typescript
   interface Notification {
     id: string;
     type: 'success' | 'error' | 'info' | 'warning';
     title: string;
     message: string;
     duration: number;
     isPersistent: boolean;
     actions?: NotificationAction[];
     timestamp: Date;
     isRead: boolean;
     isDismissed: boolean;
   }
   ```

3. Manage notification lifecycle:
   - **Created**: Added to queue
   - **Displayed**: Visible to user
   - **Dismissed**: User dismissed or auto-dismissed
   - **Read**: User clicked or acknowledged

### Step 11: Notification History

1. Store notification history:
   - Track all notifications (in-app + browser)
   - Store metadata (type, message, timestamp, action taken)
   - Retain for configurable period (e.g., 30 days)

2. Display notification history:
   - List all recent notifications
   - Filter by type, date range
   - Show read/unread status
   - Allow clearing history

3. Mark notifications as read:
   - Mark as read when user views history
   - Mark as read when user clicks notification
   - Count unread notifications

### Step 12: Notification Preferences

1. Define preference options:
   - **In-app notifications**: Enable/disable
   - **Browser notifications**: Enable/disable
   - **Sound**: Enable/disable
   - **Position**: Top/bottom, left/center/right
   - **Duration**: Auto-dismiss timing
   - **Batching**: Batch multiple notifications

2. Apply preferences to notifications:
   - Respect enabled/disabled state
   - Apply sound (if enabled)
   - Apply positioning preference
   - Apply duration preference

3. Store user preferences:
   - Persist in localStorage
   - Load preferences on app initialization
   - Allow user to change preferences in settings

## Outputs

### Primary Output: Notification Specification

```yaml
notification_specification:
  meta:
    feature_spec: string
    generated_at: datetime
    version: string

  notification_types:
    - name: string  # success, error, info, warning
      display: enum(toast|modal|banner|browser)
      severity: enum(critical|high|medium|low)
      default_duration_ms: int
      auto_dismiss: boolean
      persistent: boolean

  toast_notifications:
    structure:
      icon: string  # Icon name or URL
      title: string
      message: string
      action_button: object  # Optional
      close_button: boolean
      progress_bar: boolean

    positioning:
      vertical: enum(top|bottom)
      horizontal: enum(left|center|right)
      max_visible: int

    stacking:
      behavior: enum(stack|side_by_side|replace)
      max_queue: int
      auto_dismiss_oldest: boolean

    duration:
      success: int  # milliseconds
      error: int
      info: int
      warning: int

  modal_notifications:
    structure:
      title: string
      message: string
      error_details: string
      actions: [object]  # Buttons
      icon: string

    behavior:
      requires_dismissal: boolean
      close_on_background_click: boolean
      show_overlay: boolean

  banner_notifications:
    structure:
      message: string
      icon: string
      actions: [object]
      dismiss_button: boolean

    positioning:
      location: enum(top|bottom)
      full_width: boolean
      dismissible: boolean

    persistence:
      persist_navigation: boolean
      dismiss_on_action: boolean
      show_once: boolean

  browser_notifications:
    structure:
      title: string
      body: string
      icon: string
      badge: string
      tag: string  # For grouping

    actions:
      - action_id: string
        title: string
        icon: string

    behavior:
      request_permission_on_first: boolean
      require_interaction: boolean
      silent: boolean
      duration_ms: int

  notification_queue:
    max_visible: int
    max_queue: int
    priority:
      critical: enum(show_first|queue|block)
      high: enum(show_first|queue)
      medium: enum(queue)
      low: enum(queue)

  state_management:
    notification_state_path: string
    notification_history_path: string
    preferences_path: string

    state:
      notifications: [string]  # Notification IDs
      active_notifications: [string]  # Visible notification IDs
      queue: [string]  # Queued notification IDs
      browser_permission: enum(granted|denied|default)
      browser_enabled: boolean
      sound_enabled: boolean
      unread_count: int

    history:
      retention_period_days: int
      max_history_size: int

  preferences:
    in_app_notifications:
      enabled: boolean
      position:
        vertical: enum(top|bottom)
        horizontal: enum(left|center|right)
      duration_ms: int

    browser_notifications:
      enabled: boolean
      sound_enabled: boolean
      require_interaction: boolean

    batching:
      enabled: boolean
      max_batch_size: int
      batch_interval_ms: int

  accessibility:
    aria_live_region: enum(polite|assertive)
    aria_role: enum(alert|status|log)
    keyboard_navigable: boolean
    screen_reader_support: boolean

  integration_points:
    api_client_skill: string  # For error notifications
    notifications_skill: string  # For task reminders
    routing_skill: string  # For notification click navigation
```

### Secondary Outputs

1. **Notification Component Props**:
   ```typescript
   interface NotificationProps {
     type: 'success' | 'error' | 'info' | 'warning';
     title: string;
     message: string;
     duration?: number;
     action?: {
       label: string;
       onClick: () => void;
     };
     onDismiss?: () => void;
   }
   ```

2. **Toast Component Specification**:
   - Render position based on props
   - Auto-dismiss after duration
   - Stack multiple toasts
   - Handle animations (slide in/out)

3. **Notification Center Interface**:
   - Display notification history
   - Filter by type, date
   - Mark notifications as read
   - Clear history

4. **Browser Notification Hook**:
   ```typescript
   interface UseBrowserNotification {
     requestPermission: () => Promise<NotificationPermission>;
     show: (notification: BrowserNotification) => void;
     isSupported: boolean;
     permission: NotificationPermission;
   }
   ```

## Scope & Boundaries

### This Skill MUST:

- Design notification UI structures (toast, modal, banner)
- Design notification display and positioning
- Design notification queue and stacking behavior
- Design error notification handling and display
- Design success notification handling and display
- Design browser notification integration
- Design notification actions (retry, view, dismiss)
- Manage notification state and history
- Design notification preferences
- Ensure accessibility compliance
- Integrate with other skills (API Client, Notifications for reminders, Routing)

### This Skill MUST NOT:

- Create actual React notification components
- Implement browser notification API calls
- Generate notification icons or assets
- Write actual state management code
- Create notification settings UI
- Implement actual browser permission requests
- Write API client code for error handling
- Generate TypeScript interfaces for components
- Implement actual notification display (toast, modal, banner)
- Create notification center or history page

### Boundary Examples

**In Scope:**
- Design toast notification: Success icon, "Task created successfully", 3 seconds, top-right
- Design error toast: Error icon, "Failed to create task: Invalid title", 8 seconds
- Design banner: "Connection lost - Retrying...", yellow warning, top-full-width, persistent
- Design browser notification: Title "Task Due Soon", Body "Complete project proposal", click to view task
- Design notification queue: Max 3 toasts visible, stack new toasts, dismiss oldest
- Design action buttons: "Retry" for error, "View" for success
- Design notification history: Store last 100 notifications, show in notification center
- Design preferences: Position top-right, sound enabled, browser notifications enabled
- Design accessibility: Use `aria-live="polite"` for toasts, keyboard navigable

**Out of Scope:**
- Implement: `<Toast type="success" message="Task created" />` component
- Implement: `new Notification("Task Due Soon", { body: "..." })` browser notification call
- Create: `<NotificationList notifications={history} />` history component
- Implement: `useNotifications()` hook for notification state
- Implement: `NotificationContext.Provider` context provider
- Create: `<SettingsPage />` notification settings page
- Generate: `interface ToastProps { type: string; message: string; }` TypeScript interface
- Implement: `<div className="toast toast-success">` toast styling
- Create: Success checkmark icon or error X icon
- Implement: `Notification.requestPermission()` permission request call
- Write: `useEffect(() => { showToast(notification) }, [notification])` effect hook

## Dependencies

### Required Dependencies

1. **Spec-Kit Plus Schema**
   - Location: `/specs/.spec-kit/schema.md`
   - Purpose: Defines specification file structure

2. **Project Configuration**
   - Location: `/specs/.spec-kit/config.md`
   - Purpose: Provides notification library and browser API details

### Specification Dependencies

1. **Feature Specs**
   - Location: `/specs/features/*.md`
   - Purpose: Define notification requirements and user stories

2. **UI Specs**
   - Location: `/specs/ui/*.md`
   - Purpose: Define notification component structure and layout

3. **Notifications Specs**
   - Location: `/specs/notifications/*.md`
   - Purpose: Define browser notification requirements (task reminders)

### Skill Dependencies

1. **Frontend UI Skill**
   - Purpose: Understand notification component structure
   - Used to design notification UI integration

2. **Frontend API Client Skill**
   - Purpose: Understand API error responses
   - Used to design error notifications

3. **Notifications Skill** (Task Reminders)
   - Purpose: Understand task reminder triggers
   - Used to design browser notification integration

4. **Frontend Routing Skill**
   - Purpose: Understand navigation requirements
   - Used to design notification click actions

5. **Spec Interpretation Skill**
   - Purpose: Parse and understand feature and UI specifications
   - Used to extract notification requirements

### Optional Dependencies

1. **Frontend State Management Skill**
   - Purpose: Understand notification state requirements
   - Used to design notification state structure

## Used By Agents

### Primary Consumers

1. **General-Purpose Agents**
   - When showing notifications for user actions
   - When displaying error messages from API calls
   - When showing success confirmations
   - When managing notification queue

2. **Frontend Implementation Agents**
   - When implementing toast notification components
   - When implementing modal notifications
   - When implementing banner notifications
   - When integrating browser notifications
   - When creating notification state management

3. **UI/UX Agents**
   - When designing notification user experience
   - When optimizing notification positioning
   - When improving notification accessibility
   - When designing notification animations

4. **Plan Agents (Software Architect)**
   - When designing notification system architecture
   - When planning notification strategies
   - When designing notification preferences

### Secondary Consumers

1. **Test Generation Agents**
   - When creating notification tests
   - When testing notification queue behavior
   - When testing browser notification integration

2. **Frontend API Client Agents**
   - When showing error notifications from API calls
   - When showing success notifications for API responses

3. **Documentation Agents**
   - When documenting notification components
   - When creating notification usage guides
   - When documenting notification APIs

## Integration Notes

### Calling Convention

```yaml
skill: "frontend-notification"
inputs:
  feature_spec: "features/task-reminders.md"
  ui_spec: string  # From Frontend UI Skill
  notification_type: enum(success|error|info|warning|browser)
  notification_data:
    title: string
    message: string
    duration: int  # milliseconds
    is_persistent: boolean
    actions: [object]
  browser_notification:
    enabled: boolean
    title: string
    body: string
    icon: string
  preferences:
    in_app_enabled: boolean
    browser_enabled: boolean
    sound_enabled: boolean
    position:
      vertical: enum(top|bottom)
      horizontal: enum(left|center|right)
  output_format: "notification_specification"
```

### Error Handling

- **Browser Permission Denied**: Show in-app notification to enable in browser settings
- **Browser Not Supported**: Show in-app alternative (banner, modal)
- **Notification Queue Full**: Queue notification, dismiss oldest
- **Notification Display Failed**: Log error, show fallback (console log, banner)

### Browser Notification API Integration

- Use `Notification.requestPermission()` to request permission
- Use `new Notification(title, options)` to create notification
- Use `notification.onclose` to handle dismissal
- Use `notification.onclick` to handle clicks
- Use `Notification.permission` to check permission status

### Notification Display Best Practices

- Use color-coding: Success (green), Error (red), Info (blue), Warning (yellow)
- Use icons for quick recognition
- Keep messages concise and user-friendly
- Auto-dismiss non-critical notifications (3-5 seconds)
- Make critical notifications persistent
- Provide action buttons for common actions (retry, view)
- Show context (what action triggered notification)
- Support keyboard navigation (Tab, Enter, Escape)

### Accessibility Best Practices

- Use `aria-live="polite"` for non-critical toasts
- Use `aria-live="assertive"` for critical notifications
- Use `aria-role="alert"` for error notifications
- Ensure keyboard navigable (Tab, Enter, Escape)
- Use sufficient color contrast (4.5:1)
- Include aria-labels for icon-only notifications
- Provide screen reader-friendly messages
- Focus first toast when multiple displayed

### Notification UX Patterns

1. **Immediate Feedback**:
   - Show toast on every user action (success/error)
   - Keep duration short (3-5 seconds)
   - Use clear, concise messages

2. **Critical Alerts**:
   - Use modal for critical errors
   - Require user acknowledgment
   - Provide clear recovery instructions

3. **Persistent Messages**:
   - Use banners for persistent messages
   - Make dismissible but re-show on navigation
   - Show across all pages if needed

4. **Progress Indicators**:
   - Show progress bar for long operations
   - Update progress as operation completes
   - Show completion toast when done

5. **Context-Aware Notifications**:
   - Relate notification to user action
   - Provide action link (view task, retry)
   - Show timestamp for reference

---

**Version:** 1.0.0
**Last Updated:** 2026-01-01
**Maintainer:** Spec-Kit Plus AI Agent System
