# Notifications / Reminders Skill

## Purpose

To manage browser notifications, scheduled task reminders, and integration with recurring tasks to notify users of upcoming deadlines. This skill serves as the reasoning layer for notification scheduling, delivery, and management across the Todo application, ensuring users are timely informed of task deadlines, recurring task occurrences, and important task events.

## When to Use (Trigger Conditions)

This skill should be invoked when:

- A task is created with a due date that requires notification
- A task's due date is modified
- A recurring task schedule is created or updated
- A user requests to enable or disable notifications
- A notification needs to be sent based on task due date
- A recurring task instance is generated
- A user's notification preferences are updated
- Browser notification permissions need to be requested
- Notification delivery fails and retry is needed
- A user acknowledges or dismisses a notification
- A task is completed (cancel related notifications)
- A user views their notification history
- Notification scheduling rules need to be configured

**Triggers:**
- Task creation with due date
- Task due date modification
- Recurring task configuration
- User notification preference changes
- Scheduled notification time reached
- Browser permission status change
- Task completion (cancel notifications)
- User acknowledges/dismisses notification

## Inputs

### Required Inputs

1. **Task Information**
   - Task ID (UUID)
   - Task title and description
   - Due date and time
   - Task status (completed/incomplete)
   - Recurrence configuration (if applicable)
   - Priority level
   - User ID (for multi-user context)

2. **Notification Preferences**
   - Browser notifications enabled/disabled
   - Notification timing (e.g., 1 day before, 1 hour before, 15 minutes before)
   - Recurring task notifications enabled/disabled
   - Notification sound enabled/disabled
   - Notification frequency limits (max per hour/day)

3. **Browser Context**
   - Browser notification permission status (granted, denied, default)
   - User agent and device type
   - Current timestamp (for scheduling calculations)
   - User's timezone (if available)

### Supported Notification Types

| Notification Type | Trigger | Purpose |
|-------------------|---------|---------|
| Due Date Reminder | Task due date approaching | Remind user of upcoming task deadline |
| Overdue Alert | Task past due date | Notify user that task is overdue |
| Recurring Task Alert | New recurring task instance | Notify user of new recurring task |
| Task Completed Confirmation | Task marked complete | Confirm task completion to user |
| Task Reminders | User-set reminders | Custom reminder times for tasks |
| Daily Summary | Scheduled daily digest | Summarize today's tasks |
| Recurring Task Schedule | New recurrence created | Confirm recurring task setup |

### Notification Timing Options

- **Instant**: Immediately (e.g., task creation, completion)
- **Before Due Date**: Custom timing before due date
  - 1 week before
  - 1 day before
  - 12 hours before
  - 1 hour before
  - 15 minutes before
- **After Due Date**:
  - Immediately overdue
  - 1 day overdue
  - 1 week overdue
- **Custom**: User-defined timing
- **Daily Summary**: At specified time each day
- **Recurring**: Based on recurrence pattern

## Actions

### Step 1: Notification Eligibility Check
1. Check if task is eligible for notification:
   - Task must have a due date (for due date notifications)
   - Task must be incomplete (overdue, due date reminders)
   - Task must not be completed (most notification types)
   - User must have notifications enabled for this type
2. Check user notification preferences:
   - Browser notifications must be enabled
   - Specific notification type must be enabled
   - User must have granted browser permission
   - User must be within notification frequency limits
3. Check browser permission status:
   - Permission granted: Proceed with notification
   - Permission denied: Skip notification, log reason
   - Permission default: Request permission first
4. Check device capabilities:
   - Browser supports notifications (most modern browsers)
   - Device can receive notifications (not in do-not-disturb mode)

### Step 2: Notification Type Determination
1. Determine notification type based on trigger:
   - **Task Creation**: If task has due date, schedule due date reminders
   - **Due Date Update**: Reschedule notifications based on new due date
   - **Task Completion**: Send completion confirmation, cancel pending notifications
   - **Recurring Task**: Schedule notification for each recurring instance
   - **Scheduled Time Reached**: Send scheduled notification
   - **Overdue Check**: Send overdue alert if applicable
2. Determine notification urgency:
   - **Critical**: Task overdue, due within 1 hour
   - **High**: Due within 1 day
   - **Medium**: Due within 1 week
   - **Low**: Due in more than 1 week
3. Determine notification priority:
   - Based on task priority (critical, high, medium, low)
   - Based on urgency (overdue, due soon, upcoming)
   - Based on user preferences

### Step 3: Notification Scheduling
1. Calculate notification timing:
   - For due date reminders: Subtract timing offset from due date
     - Example: Due date 2024-01-05 10:00, 1 day before → 2024-01-04 10:00
   - For recurring tasks: Calculate each instance's due date, schedule for each
   - For custom reminders: Use user-defined reminder times
   - For daily summaries: Schedule at specified time each day
2. Create notification schedule:
   - Store scheduled notification with:
     - Notification ID (unique)
     - Task ID
     - User ID
     - Scheduled time
     - Notification type
     - Notification content (title, body, icon)
     - Status (pending, sent, cancelled)
3. Handle timezone considerations:
   - Convert due date to user's timezone
   - Schedule notification in user's local time
   - Store timezone info for accurate scheduling
4. Handle recurrence:
   - For recurring tasks, schedule notifications for each occurrence
   - Calculate next occurrence dates based on recurrence pattern (daily, weekly, monthly)
   - Schedule notifications up to a future horizon (e.g., next 12 months)

### Step 4: Browser Permission Management
1. Check current permission status:
   - `Notification.permission` API (granted, denied, default)
2. Request permission if status is `default`:
   - Use `Notification.requestPermission()` API
   - Show user-friendly UI explaining why notifications are needed
   - Handle user response (granted/denied)
3. Handle permission granted:
   - Store permission status
   - Proceed with notification scheduling/delivery
   - Enable notification preferences in UI
4. Handle permission denied:
   - Store permission status
   - Skip notification delivery
   - Show UI message instructing user to enable in browser settings
   - Log permission denied event

### Step 5: Notification Content Generation
1. Generate notification title:
   - **Due Date Reminder**: `"Task Due Soon: {task_title}"`
   - **Overdue Alert**: `"Task Overdue: {task_title}"`
   - **Recurring Task**: `"New Recurring Task: {task_title}"`
   - **Task Completed**: `"Task Completed: {task_title}"`
   - **Daily Summary**: `"Daily Task Summary for {date}"`
2. Generate notification body:
   - Include task details:
     - Task title
     - Due date/time (formatted for user's timezone)
     - Priority (if high or critical)
     - Task description (truncated if too long)
   - Include urgency information:
     - "Due in 1 hour"
     - "Overdue by 2 days"
     - "5 tasks due today"
   - Include action (if applicable):
     - "Click to view task"
     - "Tap to mark complete"
3. Generate notification options:
   - **Icon**: App icon or task-specific icon
   - **Badge**: Task priority indicator
   - **Tag**: Notification type identifier
   - **Data**: Task ID for click handling
   - **Actions**: Browser notification actions (view, dismiss, complete)
   - **Require Interaction**: Require user interaction (prevent auto-dismiss)
   - **Silent**: Silent notification (no sound)
4. Format dates and times:
   - Use user's timezone
   - Use relative time for near-term events ("in 1 hour")
   - Use absolute time for distant events ("on Jan 5 at 10:00 AM")
   - Include date and day name ("Monday, January 5")

### Step 6: Notification Delivery
1. Prepare notification object:
   ```javascript
   const notification = new Notification(title, {
     body: body,
     icon: iconUrl,
     badge: badgeUrl,
     tag: notificationTag,
     data: { taskId: taskId, notificationType: type },
     requireInteraction: requireInteraction,
     silent: silent,
     actions: [/* browser notification actions */]
   });
   ```
2. Send notification to browser:
   - Use Browser Notification API (`new Notification()`)
   - Handle delivery errors
   - Log successful delivery
3. Play notification sound (if enabled):
   - Use browser audio API
   - Play user-selected sound or default sound
   - Respect system volume settings
4. Update notification status:
   - Mark as "sent"
   - Record delivery timestamp
   - Update delivery statistics
5. Handle delivery failures:
   - Log failure reason
   - Retry if appropriate (network issues, temporary failures)
   - Skip retry for permanent failures (permission denied)

### Step 7: Notification Click Handling
1. Handle notification click:
   - Extract task ID from notification data
   - Navigate to task detail page
   - Open app if not already open
   - Focus on specific task
2. Handle notification action:
   - **View**: Navigate to task detail
   - **Dismiss**: Dismiss notification, mark as read
   - **Complete**: Mark task as completed (if applicable)
   - **Snooze**: Reschedule notification for later
3. Clear notification:
   - Remove from notification queue
   - Mark as acknowledged
   - Update notification history

### Step 8: Recurring Task Notification Management
1. Handle recurring task setup:
   - Extract recurrence pattern (daily, weekly, monthly, custom)
   - Calculate occurrence dates for next N months
   - Schedule notifications for each occurrence
   - Store recurrence schedule for future reference
2. Handle recurring task instance notification:
   - When a new recurring task instance is created:
     - Generate notification for the instance
     - Schedule based on instance due date
     - Link to parent recurring task
3. Handle recurring task completion:
   - Mark current instance notification as sent/completed
   - Schedule notification for next instance (if any)
   - Update recurrence schedule
4. Handle recurring task cancellation:
   - Cancel all pending notifications for this task
   - Remove from notification schedule
   - Notify user (optional confirmation)

### Step 9: Notification Cancellation
1. Identify notifications to cancel:
   - By task ID: Cancel all notifications for a specific task
   - By notification type: Cancel all notifications of a type
   - By user: Cancel all notifications for a user
2. Cancel scheduled notifications:
   - Remove from notification schedule
   - Mark status as "cancelled"
   - Log cancellation event
3. Handle cancellation scenarios:
   - **Task Completed**: Cancel all pending notifications for this task
   - **Task Deleted**: Cancel all notifications for this task
   - **User Disables Notifications**: Cancel all pending notifications
   - **User Revokes Permission**: Cancel all pending notifications

### Step 10: Notification History Management
1. Store notification history:
   - Record each sent notification
   - Include timestamp, type, task ID, user ID
   - Include delivery status and click status
   - Retain history for configurable period (e.g., 30 days)
2. Provide notification history view:
   - List all notifications sent to user
   - Filter by type, date, status
   - Allow user to view dismissed notifications
   - Allow user to view clicked notifications
3. Allow notification preferences from history:
   - Disable specific notification types
   - Adjust notification timing
   - Manage browser permission

### Step 11: Notification Frequency Management
1. Enforce frequency limits:
   - Limit notifications per hour (e.g., max 10 per hour)
   - Limit notifications per day (e.g., max 50 per day)
   - Prioritize critical notifications over less urgent ones
2. Batch notifications if needed:
   - Group similar notifications (e.g., "5 tasks due today")
   - Send summary instead of individual notifications
   - Respect user's batching preference
3. Handle notification queue:
   - Queue notifications when limits reached
   - Process queue when limits reset
   - Notify user of queued notifications

### Step 12: Notification Statistics and Analytics
1. Track notification metrics:
   - Total notifications sent
   - Notifications by type
   - Notifications delivered vs failed
   - Notification click-through rate
   - Notification dismissal rate
   - Average time to acknowledge
2. Analyze notification effectiveness:
   - Which notification types have highest click-through
   - Which timing is most effective
   - Which users engage most with notifications
   - Which notification settings correlate with task completion
3. Generate insights:
   - Optimal notification timing for due date reminders
   - User engagement patterns
   - Notification fatigue indicators (high dismiss rate)

## Outputs

### Primary Output: Notification Event

```yaml
notification_event:
  meta:
    notification_id: string  # Unique identifier
    task_id: string  # UUID
    user_id: string  # UUID
    timestamp: datetime  # ISO 8601
    timezone: string  # User's timezone

  notification:
    type: enum(due_date_reminder|overdue_alert|recurring_task|task_completed|daily_summary|custom_reminder)
    urgency: enum(critical|high|medium|low)
    priority: enum(critical|high|medium|low)

    content:
      title: string
      body: string
      icon_url: string
      badge_url: string
      tag: string  # For grouping

    options:
      require_interaction: boolean
      silent: boolean
      vibrate: boolean
      sound: string

    actions:
      - action_id: string
        title: string
        icon: string

    data:
      task_id: string
      task_title: string
      due_date: datetime
      notification_type: string
      redirect_url: string  # Click to navigate here

  delivery:
    status: enum(scheduled|sent|delivered|failed|cancelled|clicked|dismissed)
    scheduled_time: datetime
    sent_time: datetime
    delivered_time: datetime
    failure_reason: string
    retry_count: int
    browser_permission: enum(granted|denied|default)

  engagement:
    clicked: boolean
    clicked_at: datetime
    action_taken: string
    dismissed: boolean
    dismissed_at: datetime
    time_to_engage_seconds: int

  recurrence:
    is_recurring: boolean
    recurrence_pattern: string  # daily, weekly, monthly
    recurrence_instance_number: int
    next_instance_scheduled: boolean

  user_preferences:
    notifications_enabled: boolean
    browser_permission: enum(granted|denied|default)
    notification_timing: string
    sound_enabled: boolean
```

### Secondary Outputs

1. **Notification Schedule**:
   ```yaml
   notification_schedule:
     user_id: string
     notifications:
       - notification_id: string
         task_id: string
         scheduled_time: datetime
         type: string
         status: enum(pending|sent|cancelled)
     next_notification: datetime
     total_pending: int
   ```

2. **Notification History**:
   ```yaml
   notification_history:
     user_id: string
     from_date: datetime
     to_date: datetime
     total_notifications: int
     notifications:
       - notification_id: string
         type: string
         sent_at: datetime
         status: enum(sent|clicked|dismissed)
         task_id: string
     statistics:
       click_through_rate: float
       dismissal_rate: float
       average_response_time: int
   ```

3. **Notification Summary**:
   ```yaml
   notification_summary:
     date: datetime  # Today's date
     user_id: string
     total_tasks_due: int
     overdue_tasks: int
     upcoming_tasks:
       - task_id: string
         title: string
         due_time: datetime
         priority: string
     summary_message: string
     "5 tasks due today: 1 overdue, 2 high priority"
   ```

4. **Recurrence Schedule**:
   ```yaml
   recurrence_schedule:
     recurring_task_id: string
     user_id: string
     pattern: enum(daily|weekly|monthly|custom)
     occurrences:
       - occurrence_number: int
         due_date: datetime
         notification_scheduled: boolean
         notification_time: datetime
     total_occurrences: int
     next_occurrence: datetime
   ```

5. **Notification Statistics**:
   ```yaml
   notification_statistics:
     time_period:
       from: datetime
       to: datetime
     total_sent: int
     total_failed: int
     delivery_rate: float
     by_type:
       - type: string
         count: int
         percentage: float
     engagement:
       click_through_rate: float
       dismissal_rate: float
       average_response_time: int
     effectiveness:
       most_effective_type: string
       most_effective_timing: string
     user_engagement:
       - user_id: string
         notifications_received: int
         notifications_clicked: int
         engagement_rate: float
   ```

## Scope & Boundaries

### This Skill MUST:

- Determine notification eligibility based on task and user preferences
- Schedule notifications based on due dates and user timing preferences
- Generate notification content (title, body, options)
- Manage browser notification permissions (request, check, handle)
- Deliver notifications using Browser Notification API
- Handle notification clicks and actions
- Manage recurring task notifications
- Cancel notifications when tasks are completed or deleted
- Maintain notification history for users
- Enforce notification frequency limits
- Generate notification summaries (daily task summaries)
- Track notification delivery and engagement metrics
- Provide notification statistics and analytics

### This Skill MUST NOT:

- Create or modify tasks (only schedule notifications for existing tasks)
- Implement business logic for task completion or scheduling
- Generate frontend UI components (notification settings UI)
- Configure backend API endpoints for task management
- Send email notifications or push notifications (outside browser scope)
- Store task data or modify database schemas
- Implement actual task recurrence logic (only schedule notifications)
- Implement recurring task instance generation
- Modify user notification preferences in UI
- Implement browser permission UI (only request permission via API)

### Boundary Examples

**In Scope:**
- Calculate notification time: Due date 2024-01-05 10:00 → Notify at 2024-01-04 10:00 (1 day before)
- Generate notification content: "Task Due Soon: Complete project proposal - Due in 1 day"
- Request browser permission: `Notification.requestPermission()`
- Deliver notification: `new Notification("Task Due Soon: ...", options)`
- Handle notification click: Navigate to `/tasks/{taskId}` on click
- Schedule recurring task notifications: Weekly task → Schedule notification for each occurrence
- Cancel notifications: Task completed → Cancel all pending notifications for this task
- Generate daily summary: "5 tasks due today: 1 overdue, 2 high priority"
- Track metrics: Click-through rate, dismissal rate, average response time

**Out of Scope:**
- Create task: `POST /api/todos` with task data
- Mark task complete: `PATCH /api/todos/{id}` with status: completed
- Generate recurring task instances based on schedule
- Create notification settings UI component in React
- Write backend API endpoint: `GET /api/notifications`
- Store notification preferences in database
- Implement task recurrence business logic
- Send email notification: `sendEmail(user.email, "Task due soon")`
- Send push notification to mobile device
- Render notification settings form UI

## Dependencies

### Required Dependencies

1. **Spec-Kit Plus Schema**
   - Location: `/specs/.spec-kit/schema.md`
   - Purpose: Defines specification file structure

2. **Project Configuration**
   - Location: `/specs/.spec-kit/config.md`
   - Purpose: Provides notification strategy and browser capabilities

### Specification Dependencies

1. **Notification Specs**
   - Location: `/specs/notifications/*.md`
   - Purpose: Define notification types, timing, and preferences

2. **Task Specs**
   - Location: `/specs/tasks/*.md`
   - Purpose: Define task structure, due dates, recurrence

3. **Feature Specs**
   - Location: `/specs/features/*.md`
   - Purpose: Define notification requirements (reminders, summaries)

4. **Architecture Specs**
   - Location: `/specs/architecture/*.md`
   - Purpose: Define notification architecture and browser integration

### Skill Dependencies

1. **Task Business Logic Skill**
   - Purpose: Understand task structure, due dates, recurrence, and completion
   - Used to determine notification eligibility and timing

2. **Spec Interpretation Skill**
   - Purpose: Parse and understand notification and task specifications
   - Used to extract notification requirements and preferences

### Optional Dependencies

1. **Frontend UI Skill**
   - Purpose: Understand notification display in UI
   - Used to design notification center/history UI

2. **Error Handling / Logging Skill**
   - Purpose: Log notification delivery failures
   - Used to track and analyze notification errors

## Used By Agents

### Primary Consumers

1. **General-Purpose Agents**
   - When scheduling notifications for tasks with due dates
   - When handling browser notification permissions
   - When delivering scheduled notifications
   - When managing recurring task notifications

2. **Frontend Implementation Agents**
   - When implementing browser notification integration
   - When creating notification center/history UI
   - When handling notification clicks and actions
   - When managing user notification preferences

3. **Task Management Agents**
   - When task is created with due date
   - When task due date is modified
   - When task is completed (cancel notifications)
   - When recurring task is set up

4. **Plan Agents (Software Architect)**
   - When designing notification architecture
   - When planning notification scheduling strategy
   - When designing recurrence notification handling

### Secondary Consumers

1. **Analytics Agents**
   - When analyzing notification effectiveness
   - When generating notification statistics
   - When optimizing notification timing and content

2. **User Experience Agents**
   - When optimizing notification engagement
   - When designing notification content
   - When managing notification fatigue

3. **Testing Agents**
   - When testing notification delivery
   - When testing notification click handling
   - When testing recurring task notifications

## Integration Notes

### Calling Convention

```yaml
skill: "notifications"
inputs:
  task:
    task_id: string
    title: string
    due_date: datetime
    priority: string
    is_completed: boolean
    recurrence: object  # Recurrence config
  notification_type: enum(due_date_reminder|overdue|recurring|completed|summary)
  user_preferences:
    enabled: boolean
    browser_permission: enum(granted|denied|default)
    timing: string  # "1_day_before", "1_hour_before", etc.
    sound_enabled: boolean
  browser_context:
    user_agent: string
    device_type: string
    timezone: string
  operation: enum(schedule|deliver|cancel|click|dismiss|history|summary)
  output_format: enum(notification_event|schedule|history|summary|statistics)
```

### Error Handling

- **Permission Denied**: Skip notification, log reason, show UI message to enable in browser
- **Notification Delivery Failed**: Retry if temporary failure, skip if permanent
- **Browser Not Supported**: Skip notification, log browser not supported
- **Task Not Found**: Skip notification, log task not found
- **Invalid Due Date**: Skip notification, log invalid due date

### Browser Notification API

**Key APIs:**
- `Notification.requestPermission()` - Request permission
- `new Notification(title, options)` - Create notification
- `Notification.permission` - Check permission status
- `notification.onclick` - Handle click
- `notification.onclose` - Handle close/dismiss
- `notification.close()` - Close notification

**Notification Options:**
- `body` - Notification body text
- `icon` - Notification icon URL
- `badge` - Small icon URL
- `tag` - Notification tag for grouping
- `data` - Custom data (task ID, type, etc.)
- `requireInteraction` - Require user to interact
- `silent` - Silent notification (no sound)
- `actions` - Browser notification buttons

### Notification Timing Recommendations

**High Priority Tasks:**
- Notify 1 day before
- Notify 1 hour before
- Notify 15 minutes before

**Medium Priority Tasks:**
- Notify 1 day before
- Notify 1 hour before

**Low Priority Tasks:**
- Notify 1 day before

**Overdue Tasks:**
- Notify immediately overdue
- Notify 1 day overdue
- Notify 1 week overdue

### Recurring Task Notification Strategy

**Daily Recurrence:**
- Schedule notification for each occurrence
- Time based on task creation time or user preference

**Weekly Recurrence:**
- Schedule notification for each week's occurrence
- Same day and time each week

**Monthly Recurrence:**
- Schedule notification for each month's occurrence
- Same day and time each month

**Custom Recurrence:**
- Schedule notification based on custom pattern
- May include multiple times per week/month

### Notification Frequency Limits

**Recommended Limits:**
- Maximum 10 notifications per hour
- Maximum 50 notifications per day
- Maximum 200 notifications per week

**Batching Strategy:**
- When limits reached, batch similar notifications
- "5 tasks due today" instead of 5 individual notifications
- "3 tasks overdue" instead of 3 individual notifications

### Notification Content Best Practices

**Titles:**
- Clear and concise (max 50 characters)
- Include urgency indicator if critical
- Start with action verb if applicable

**Bodies:**
- Include task title
- Include due date/time (user's timezone)
- Include priority if high/critical
- Include call-to-action (click to view, etc.)
- Keep under 120 characters for optimal display

**Icons:**
- Use app icon for general notifications
- Use priority-specific icon for high/critical tasks
- Use calendar icon for due date reminders
- Use checkmark icon for completion confirmations

---

**Version:** 1.0.0
**Last Updated:** 2026-01-01
**Maintainer:** Spec-Kit Plus AI Agent System
