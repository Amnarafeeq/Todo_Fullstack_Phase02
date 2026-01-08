# Backend Notifications / Reminders Skill

## Purpose

To schedule recurring tasks and background jobs, integrate with FastAPI BackgroundTasks or Celery, and manage task reminders. This skill serves as the reasoning layer for backend notification scheduling, recurring task generation, reminder execution, and job management.

## When to Use (Trigger Conditions)

This skill should be invoked when:

- A recurring task is created or updated
- Task due dates or reminders need to be scheduled
- Background job scheduling is required
- Recurring task instance generation is needed
- Job queue or scheduler configuration is needed
- Background task execution status needs to be tracked
- Failed background jobs need to be retried
- Job results need to be stored or notifications sent
- Background job monitoring and metrics are required
- Scheduled jobs need to be cancelled or rescheduled

**Triggers:**
- Recurring task configuration created/updated
- Task with due date created/updated
- Background job needs to be scheduled
- Reminder notification time reached
- Job execution completes or fails
- System startup (initialize recurring tasks)
- Maintenance window (clean up completed jobs)

## Inputs

### Required Inputs

1. **Task Configuration**
   - Task ID and type
   - Recurrence pattern (daily, weekly, monthly, custom)
   - Due date and time
   - Reminder timing (e.g., 15 minutes before)
   - Recurrence end date (if applicable)
   - User ID and tenant ID (multi-tenant)

2. **Job Configuration**
   - Job type and name
   - Scheduled execution time
   - Job parameters or payload
   - Retry configuration (max attempts, backoff)
   - Callback URL or handler function

3. **System Context**
   - Background task framework (BackgroundTasks, Celery, etc.)
   - Scheduler configuration
   - Queue or broker details (Redis, RabbitMQ, etc.)

### Supported Job Types

| Job Type | Purpose | Schedule |
|----------|---------|----------|
| Task Reminder | Notify user of upcoming due date | Cron/Schedule |
| Recurring Task Generation | Create next instance of recurring task | Cron/Interval |
| Task Overdue Alert | Notify user of overdue task | Cron/Schedule |
| Daily Summary | Send daily task summary to user | Cron |
| Weekly Report | Send weekly task report to user | Cron |
| Maintenance Job | Clean up old jobs, logs, etc. | Cron |
| Data Sync | Sync data with external services | Schedule |

## Actions

### Step 1: Recurring Task Analysis

1. Analyze recurring task configuration:
   - Extract recurrence pattern (daily, weekly, monthly, custom)
   - Extract task data (title, description, priority, etc.)
   - Extract start date and end date (if applicable)
   - Extract user context (user_id, tenant_id)
2. Validate recurrence configuration:
   - Valid recurrence pattern provided
   - Start date is valid (not in past if configured)
   - End date is valid (after start date if provided)
   - Task data is complete (required fields)
3. Calculate occurrence dates:
   - Generate next N occurrences based on pattern
   - Respect end date constraint
   - Consider timezone
4. Store recurring task schedule:
   - Save in database with schedule details
   - Generate unique schedule ID

### Step 2: Recurring Task Instance Generation

1. Generate task instance for each occurrence:
   - Copy base task data to new instance
   - Set due date to occurrence date
   - Set created_at to schedule time
   - Link to parent recurring task
   - Set instance number
2. Apply task-specific rules:
   - Adjust due date based on business rules
   - Apply any time-based calculations
   - Handle edge cases (weekend, holidays)
3. Store task instance:
   - Insert into database
   - Link to parent recurring task
   - Record schedule and occurrence details
4. Trigger notifications:
   - Send notification for new task instance (if configured)
   - Add to user's task list

### Step 3: Reminder Scheduling

1. Determine reminder timing:
   - Extract task due date/time
   - Calculate reminder time (e.g., due_date - 1 hour, due_date - 1 day)
   - Apply user preference for reminder timing
   - Respect timezone
2. Schedule reminder job:
   - Create scheduled job with reminder metadata
   - Include task ID and user ID in job payload
   - Set job type (reminder, overdue alert, etc.)
   - Configure retry policy
3. Handle reminder conflicts:
   - If multiple reminders for same task, deduplicate
   - If reminder time is in past, execute immediately
   - If reminder time is too far in future, validate

### Step 4: Background Job Scheduling

1. Choose scheduling mechanism:
   - **FastAPI BackgroundTasks**: For simple in-process background tasks
   - **Celery**: For distributed task queue with Redis/RabbitMQ
   - **APScheduler**: For advanced scheduling features
2. Create job definition:
   - Define job function/handler
   - Define job parameters/payload
   - Define scheduling rules (cron, interval, date)
3. Schedule job:
   - Add to scheduler or queue
   - Set execution time
   - Set job ID or name
   - Configure job options (timeout, retry, etc.)
4. Store job metadata:
   - Job ID and type
   - Scheduled execution time
   - Job parameters
   - Status (pending, running, completed, failed)
   - Related entity IDs (task_id, user_id, etc.)

### Step 5: Job Execution

1. Execute job at scheduled time:
   - Trigger job handler function
   - Pass job parameters
   - Execute in worker process (if using Celery)
   - Execute in background thread (if using BackgroundTasks)
2. Handle job dependencies:
   - Wait for dependent jobs to complete
   - Execute in correct order
   - Fail entire chain if dependency fails
3. Track job execution:
   - Update job status to 'running'
   - Record start time
   - Track progress (for long-running jobs)
4. Execute job logic:
   - For reminders: Send notification
   - For task generation: Create task instance
   - For maintenance: Execute cleanup
   - For sync: Call external API, store results

### Step 6: Job Result Handling

1. Process successful execution:
   - Update job status to 'completed'
   - Record completion time
   - Store job result/output
   - Trigger follow-up actions (if any)
2. Handle job failure:
   - Update job status to 'failed'
   - Record error message and stack trace
   - Determine if retry is needed
   - Schedule retry if allowed and under max attempts
   - Alert on critical job failures
3. Handle job timeout:
   - Update job status to 'failed'
   - Record timeout event
   - Schedule retry if appropriate
   - Alert on repeated timeouts
4. Store job metrics:
   - Execution duration
   - Retry count
   - Success/failure status
   - Resource usage (if tracked)

### Step 7: Job Retry Strategy

1. Determine if retry is needed:
   - Retryable errors (network, temporary failures)
   - Non-retryable errors (validation, business logic)
   - Retry count under maximum
2. Calculate backoff:
   - Exponential backoff: base * 2^retry_count
   - Fixed backoff: constant delay
   - Jitter: Add randomness to prevent thundering herd
3. Schedule retry job:
   - Create new job with same parameters
   - Set retry count + 1
   - Schedule with backoff delay
   - Link to original job
4. Handle max retries exceeded:
   - Mark job as permanently failed
   - Alert admin or support
   - Record failure for analysis

### Step 8: Job Cancellation

1. Cancel scheduled jobs:
   - Remove from scheduler
   - Update job status to 'cancelled'
   - Clean up job metadata
2. Cancel recurring task instances:
   - Cancel all pending instance generations
   - Update recurring task status
   - Clean up scheduled jobs
3. Cancel reminders:
   - Remove pending reminder jobs
   - Update task reminder status
   - Clean up reminder metadata
4. Cancel on user action:
   - User deletes task → Cancel all related jobs
   - User marks task complete → Cancel overdue reminders
   - User disables reminders → Cancel all reminder jobs

### Step 9: Job Monitoring and Metrics

1. Track job execution metrics:
   - Total jobs scheduled
   - Jobs executed successfully
   - Jobs failed
   - Average execution time
   - Retry rate
   - Queue depth (if using queue)
2. Monitor job health:
   - Stuck jobs (running too long)
   - Failed jobs recurring
   - Queue backlog
   - Worker health
3. Generate job reports:
   - Daily job execution summary
   - Job failure analysis
   - Performance metrics
   - Job type breakdown
4. Set up alerts:
   - Alert on high failure rate
   - Alert on queue depth threshold
   - Alert on stuck jobs

### Step 10: Multi-User and Multi-Tenant Support

1. Isolate jobs per user:
   - Job context includes user_id
   - Reminders sent to specific user
   - Jobs don't affect other users
2. Isolate jobs per tenant:
   - Job context includes tenant_id
   - Jobs executed with tenant context
   - Data isolation maintained
3. Support user-specific schedules:
   - Different timezones per user
   - User preference for reminder timing
   - Recurrence patterns per user
4. Handle user deletion:
   - Cancel all jobs for deleted user
   - Clean up job metadata
   - Clear reminder schedules

### Step 11: Maintenance Jobs

1. Schedule cleanup jobs:
   - Clean up completed jobs older than N days
   - Clean up failed jobs older than N days
   - Clean up orphaned job metadata
   - Compact job queue
2. Schedule maintenance tasks:
   - Archive old job logs
   - Generate job statistics reports
   - Optimize database indexes
   - Clean up expired reminders
3. Schedule data consistency jobs:
   - Verify job status consistency
   - Repair orphaned jobs
   - Sync with actual task data
4. Schedule system health checks:
   - Check scheduler health
   - Check queue health
   - Check worker health

### Step 12: Job Queue Management

1. Configure queue settings:
   - Queue name and type
   - Worker processes/threads
   - Prefetch count
   - Queue timeout
   - Rate limiting (if applicable)
2. Monitor queue depth:
   - Track pending jobs
   - Alert on queue depth threshold
   - Scale workers if needed (auto-scaling)
3. Prioritize jobs:
   - High priority for critical jobs (reminders, etc.)
   - Low priority for maintenance jobs
   - Custom priority per job type
4. Handle queue errors:
   - Queue connection failures
   - Job serialization failures
   - Worker crashes

## Outputs

### Primary Output: Job Schedule Specification

```yaml
backend_notification_specification:
  meta:
    feature_spec: string
    task_spec: string
    generated_at: datetime
    version: string
    scheduler_type: enum(background_tasks|celery|apscheduler|custom)

  recurring_tasks:
    - task_id: string
      pattern: enum(daily|weekly|monthly|custom)
      start_date: datetime
      end_date: datetime  # Optional
      user_id: string
      tenant_id: string

      occurrences:
        - occurrence_number: int
          scheduled_date: datetime
          task_instance_id: string  # If instance created
          reminder_scheduled: boolean
          reminder_time: datetime

      schedule:
        schedule_id: string
        status: enum(active|paused|completed|cancelled)
        total_occurrences: int
        created_occurrences: int
        next_occurrence: datetime

  reminder_jobs:
    - reminder_id: string
      task_id: string
      user_id: string
      tenant_id: string

      timing:
        type: enum(due_date|overdue|custom)
        offset: string  # e.g., "1_hour_before", "1_day_before"
        scheduled_time: datetime
        timezone: string

      job:
        job_id: string
        job_type: string
        status: enum(pending|running|completed|failed|cancelled)
        scheduled_at: datetime
        executed_at: datetime
        duration_seconds: int

      notification:
        method: enum(email|push|browser|in_app)
        template: string
        sent: boolean
        sent_at: datetime

  background_jobs:
    - job_id: string
      job_name: string
      job_type: string
      payload: object

      schedule:
        trigger_type: enum(cron|interval|date|once)
        schedule_expression: string  # Cron expression or ISO date
        timezone: string
        repeat_interval: int  # For interval jobs

      execution:
        status: enum(pending|running|completed|failed|cancelled)
        scheduled_at: datetime
        started_at: datetime
        completed_at: datetime
        duration_seconds: int
        worker_id: string
        retry_count: int

      result:
        success: boolean
        output: object
        error: object
        stack_trace: string  # Development only

      retry:
        enabled: boolean
        max_attempts: int
        backoff_strategy: enum(fixed|exponential|jitter)
        current_attempt: int
        next_attempt_at: datetime

      metadata:
        task_id: string  # If job is task-related
        user_id: string
        tenant_id: string
        correlation_id: string

  job_queue:
    queue_name: string
    queue_type: string
    pending_jobs: int
    running_jobs: int
    failed_jobs: int
    queue_depth: int

    workers:
      total: int
      active: int
      idle: int

    configuration:
      concurrency: int
      prefetch_count: int
      timeout_seconds: int
      rate_limit: int

  maintenance:
    - job_name: string
      schedule: string  # Cron expression
      tasks:
        - name: string
          description: string
          enabled: boolean

      execution:
        last_run: datetime
        next_run: datetime
        status: string
        duration_seconds: int
        result: object

  monitoring:
    metrics:
      total_jobs_scheduled: int
      jobs_completed: int
      jobs_failed: int
      average_execution_time_ms: int
      retry_rate: float

    health:
      scheduler_status: enum(healthy|degraded|down)
      queue_status: enum(healthy|degraded|down)
      worker_status: enum(healthy|degraded|down)

    alerts:
      - alert_type: enum(queue_depth|high_failure_rate|stuck_job|scheduler_down)
        severity: enum(info|warn|error|critical)
        message: string
        timestamp: datetime
        alert_sent: boolean

  cleanup:
    - job_name: string
      schedule: string
      tasks:
        - name: string
          retention_days: int
      execution:
        last_run: datetime
        jobs_cleaned: int
        records_deleted: int
```

### Secondary Outputs

1. **Job Definition**:
   ```python
   # FastAPI BackgroundTask
   @app.on_event("startup")
   async def setup_recurring_tasks():
       # Initialize recurring tasks
       pass

   @repeat_every(seconds=86400)  # Daily
   async def create_recurring_task_instances():
       # Generate next instances
       pass
   ```

2. **Celery Task Definition**:
   ```python
   # Celery task
   from celery import Celery

   app = Celery('tasks', broker='redis://localhost:6379/0')

   @app.task
   def send_reminder(task_id, user_id):
       # Send reminder notification
       pass
   ```

3. **Job Metadata Record**:
   ```python
   # Database model
   class JobMetadata(SQLModel, table=True):
       id: UUID = Field(default_factory=uuid4)
       job_name: str
       job_type: str
       scheduled_at: datetime
       status: str
       task_id: UUID = Field(default=None)
       user_id: UUID = Field(default=None)
       created_at: datetime = Field(default_factory=datetime.utcnow)
       completed_at: datetime = Field(default=None)
       retry_count: int = Field(default=0)
       error: str = Field(default=None)
   ```

4. **Job Schedule Record**:
   ```python
   # Database model for recurring tasks
   class RecurringTaskSchedule(SQLModel, table=True):
       id: UUID = Field(default_factory=uuid4)
       task_id: UUID  # Base task
       user_id: UUID
       pattern: str  # daily, weekly, etc.
       start_date: datetime
       end_date: Optional[datetime]
       status: str  # active, paused, completed
       next_occurrence: datetime
       created_at: datetime = Field(default_factory=datetime.utcnow)
   ```

## Scope & Boundaries

### This Skill MUST:

- Schedule recurring task instances
- Schedule task reminders (due date, overdue)
- Execute background jobs
- Handle job retries with backoff
- Cancel jobs when needed
- Monitor job execution and health
- Support multi-user and multi-tenant isolation
- Generate job metrics and reports
- Schedule maintenance and cleanup jobs

### This Skill MUST NOT:

- Create actual task instances in database (only schedule)
- Send actual notifications (only schedule notification jobs)
- Implement recurring task business logic (only schedule instances)
- Implement actual FastAPI BackgroundTasks code (only design strategy)
- Implement Celery workers or brokers (only configure)
- Create user-facing notification UI (only schedule jobs)
- Define database schemas or models (only schedule)
- Write application code (only design job execution logic)

### Boundary Examples

**In Scope:**
- Calculate next occurrence dates for weekly recurring task starting Monday
- Schedule reminder job 1 hour before task due date
- Schedule job to generate task instance every week at 9 AM
- Configure retry with exponential backoff: delay = 60 * 2^retry_count
- Cancel all jobs when task is deleted
- Monitor job queue depth and alert if > 100 pending jobs
- Schedule daily cleanup job at 3 AM to remove jobs older than 30 days
- Isolate job by user_id and tenant_id for multi-tenant support

**Out of Scope:**
- Insert task instance into database table
- Send browser notification: `new Notification("Task Due Soon")`
- Implement `@app.on_event("startup")` FastAPI event handler
- Implement Celery worker: `celery -A worker1 tasks.celery`
- Create SQLModel class: `class RecurringTaskSchedule(SQLModel, table=True)`
- Create job queue and Redis connection
- Write actual task creation logic in job handler

## Dependencies

### Required Dependencies

1. **Spec-Kit Plus Schema**
   - Location: `/specs/.spec-kit/schema.md`
   - Purpose: Defines specification file structure

2. **Project Configuration**
   - Location: `/specs/.spec-kit/config.md`
   - Purpose: Provides background task framework details

### Specification Dependencies

1. **Feature Specs**
   - Location: `/specs/features/*.md`
   - Purpose: Define recurring task requirements and reminder needs

2. **Task Specs**
   - Location: `/specs/tasks/*.md`
   - Purpose: Define task recurrence patterns and reminder timing

3. **Notifications Specs**
   - Location: `/specs/notifications/*.md`
   - Purpose: Define notification types and delivery methods

### Skill Dependencies

1. **Task Business Logic Skill**
   - Purpose: Understand task business rules
   - Used to schedule task instance generation

2. **Notifications / Reminders Skill**
   - Purpose: Understand notification requirements
   - Used to schedule notification jobs

3. **Spec Interpretation Skill**
   - Purpose: Parse and understand feature and task specifications
   - Used to extract recurring task and reminder requirements

### Optional Dependencies

1. **API Construction Skill**
   - Purpose: Understand task API endpoints
   - Used to schedule task instance creation jobs

2. **Database Modeling Skill**
   - Purpose: Understand task and schedule data structures
   - Used to design job metadata storage

## Used By Agents

### Primary Consumers

1. **General-Purpose Agents**
   - When scheduling recurring tasks
   - When scheduling reminders
   - When scheduling background jobs
   - When managing job execution

2. **Backend Implementation Agents**
   - When implementing background task framework
   - When implementing job schedulers
   - When implementing recurring task logic
   - When implementing reminder logic

3. **Infrastructure Agents**
   - When configuring job queues (Redis, RabbitMQ)
   - When configuring workers and schedulers
   - When scaling workers based on queue depth

4. **Plan Agents (Software Architect)**
   - When designing background task architecture
   - When planning job scheduling strategy
   - When choosing scheduling framework

### Secondary Consumers

1. **Monitoring Agents**
   - When tracking job execution metrics
   - When monitoring scheduler health
   - When alerting on job failures

2. **Testing & QA Agents**
   - When testing background job execution
   - When testing retry logic
   - When testing job cancellation

3. **DevOps Agents**
   - When deploying background task infrastructure
   - When monitoring job queues
   - When setting up worker auto-scaling

## Integration Notes

### Calling Convention

```yaml
skill: "backend-notifications"
inputs:
  task_spec: "features/recurring-tasks.md"
  notification_spec: "notifications/task-reminders.md"
  operation: enum(schedule_recurring|schedule_reminder|execute_job|cancel_job|monitor_jobs)
  task_data:
    task_id: string
    title: string
    due_date: datetime
    recurrence_pattern: enum(daily|weekly|monthly|custom)
    user_id: string
    tenant_id: string
  reminder_config:
    type: enum(due_date|overdue|custom)
    offset: string  # e.g., "1_hour_before"
    timezone: string
  job_config:
    job_type: string
    scheduled_at: datetime
    retry_enabled: boolean
    max_retries: int
    backoff_strategy: enum(fixed|exponential|jitter)
  output_format: "job_schedule_specification"
```

### Error Handling

- **Invalid Recurrence Pattern**: Return validation error
- **Job Scheduling Failed**: Return error, log failure, alert admin
- **Job Execution Failed**: Retry if retryable, alert on max retries
- **Queue Connection Failed**: Alert admin, attempt reconnection
- **Worker Crash**: Alert admin, monitor worker health

### Background Task Framework Options

**FastAPI BackgroundTasks**:
- In-process background tasks
- Simple, no external dependencies
- Good for low volume, simple jobs
- Limited scheduling features

**Celery**:
- Distributed task queue
- Worker pools
- Advanced scheduling (cron, intervals)
- Requires broker (Redis, RabbitMQ)
- Good for high volume, complex jobs

**APScheduler**:
- Advanced scheduling features
- In-process or distributed
- Cron expression support
- Job persistence
- Good for complex scheduling needs

### Recurrence Patterns

**Daily**:
```python
# Execute every day at 9 AM
cron: "0 9 * * *"
```

**Weekly**:
```python
# Execute every Monday at 9 AM
cron: "0 9 * * 1"
```

**Monthly**:
```python
# Execute on 1st of month at 9 AM
cron: "0 9 1 * *"
```

**Custom**:
```python
# Custom cron expression
# Execute on first of every month at 10 AM
cron: "0 10 1 * *"
```

### Retry Strategies

**Fixed Backoff**:
```python
retry_delay = 60  # Fixed 60 seconds
```

**Exponential Backoff**:
```python
retry_delay = 60 * (2 ** retry_count)
```

**Jitter**:
```python
import random
jitter = random.uniform(0.9, 1.1)  # 10% variation
retry_delay_with_jitter = retry_delay * jitter
```

### Job Prioritization

**Priority Levels**:
- High priority: Reminders, critical jobs
- Medium priority: Task generation, data sync
- Low priority: Maintenance, cleanup jobs

**Priority Implementation**:
- Use multiple queues (high, medium, low)
- Workers consume from high priority queue first
- Or use job priority field

---

**Version:** 1.0.0
**Last Updated:** 2026-01-01
**Maintainer:** Spec-Kit Plus AI Agent System
