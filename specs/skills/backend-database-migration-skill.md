# Backend Database Migration Skill

## Purpose

The Backend Database Migration Skill is responsible for planning, designing, and validating database schema changes and data migrations using Alembic for the FastAPI + SQLModel + Neon PostgreSQL stack. This skill ensures all database changes are version-controlled, reversible, and executed with minimal downtime. The skill focuses on reasoning about migration strategies, risk assessment, and planning rather than implementing the actual migration scripts.

## When to Use

Use this skill when:

- Planning new database tables or modifying existing schemas
- Adding, removing, or altering columns in database tables
- Changing data types or constraints on existing columns
- Adding or removing indexes for performance optimization
- Implementing data migrations (transforming existing data)
- Planning zero-downtime migrations for production
- Designing rollback procedures for failed migrations
- Synchronizing database schemas across environments (development, staging, production)
- Managing database versioning and schema drift detection
- Planning breaking changes that require multi-step migrations

## Inputs

### Primary Inputs

1. **Database Specification**
   - From: Database Modeling Skill
   - Contains: Schema definitions, relationships, constraints, indexes

2. **Current Database Version**
   - From: Alembic version table or configuration
   - Contains: Current migration version applied

3. **Target Schema Changes**
   - Contains: List of schema changes to apply (tables, columns, indexes, constraints)
   - Migration type: schema_change, data_migration, breaking_change

4. **Environment Context**
   - Environment: development | staging | production
   - Current version: string
   - Target version: string
   - Context settings:
     - create_backup: boolean
     - rollback_required: boolean
     - zero_downtime: boolean

5. **Application Impact**
   - Affected API endpoints
   - Backward compatibility requirements
   - Deprecated features

## Actions

### Step 1: Migration Requirement Analysis

1. Identify schema changes needed:
   - New tables to create
   - Columns to add, modify, or drop
   - Indexes to create or drop
   - Constraints to add or remove
   - Relationships to establish or modify

2. Determine migration type:
   - Simple schema change (add column, add table)
   - Complex schema change (modify column type, drop column)
   - Data migration (transform data, copy data)
   - Breaking change (requires downtime or multi-step approach)

3. Assess risk level:
   - Low: Add table, add nullable column
   - Medium: Add index, add non-null column with default
   - High: Modify column type, drop column, data migration
   - Critical: Drop table, incompatible type change, break referential integrity

### Step 2: Migration Sequence Planning

1. Determine migration order:
   - Dependencies between migrations
   - Prerequisites for each migration
   - Sequential execution order

2. Plan for breaking changes:
   - Design multi-step migration for zero downtime
   - Add column as nullable first, then populate, then make non-null
   - Create new table, migrate data, switch references, drop old table

3. Design rollback strategy:
   - Each migration must have corresponding downgrade
   - Rollback must be tested in staging
   - Determine if data rollback is possible (backup may be needed)

**Example**: Adding `completed_at` column to `todos` table
- Plan: Add nullable column -> Populate for completed tasks -> Make non-null
- Rollback: Remove column (data loss acceptable if backup exists)
- Validation: Check column exists, verify data integrity

### Step 3: Breaking Change Handling

1. Identify breaking changes:
   - Dropping columns or tables
   - Changing column types (incompatible)
   - Adding constraints that reject existing data
   - Removing relationships

2. Design breaking change strategy:
   - Multi-step migration for minimal downtime
   - Add column as nullable first
   - Populate default values
   - Update application code to use new schema
   - Apply constraints after deployment
   - Deprecate old fields before removal

3. Maintain compatibility with existing application code:
   - Add temporary compatibility layers
   - Deprecate old fields before removal

4. Example: Adding non-null column with default
   - Step 1: Add column as nullable
   - Step 2: Populate column with default values
   - Step 3: Make column non-null
   - Step 4: Remove nullable constraint

### Step 4: Data Migration Planning

1. Identify data migration needs:
   - Transform data from old schema to new schema
   - Copy data from one table to another
   - Validate and clean data
   - Populate default values

2. Design data transformation logic:
   - Map old fields to new fields
   - Transform data types (e.g., string to enum, timestamp to date)
   - Apply business rules during transformation
   - Validate data after transformation

3. Plan backup and restore:
   - Create backup before data migration
   - Validate data integrity after migration
   - Rollback data if validation fails

### Step 5: Migration Validation

1. Validate migration before execution:
   - Test migration on staging environment
   - Validate SQL syntax
   - Validate data integrity
   - Validate performance impact

2. Validate after execution:
   - Verify schema changes applied correctly
   - Verify data integrity
   - Verify constraints are enforced
   - Verify indexes are created
   - Verify application works with new schema

3. Validate rollback:
   - Test rollback on staging
   - Verify data is restored
   - Verify schema is reverted

### Step 6: Migration Execution

1. Execute migration steps:
   - Apply migration in order
   - Execute upgrade function
   - Monitor progress
   - Log execution details

2. Handle errors during execution:
   - Identify error (syntax error, constraint violation, data issue)
   - Rollback transaction if error occurs
   - Log error details
   - Alert team if rollback fails

3. Use transaction for migration:
   - All or nothing execution
   - Commit transaction if successful
   - Rollback transaction if error

### Step 7: Rollback Planning and Execution

1. Determine rollback requirement:
   - Migration failed and needs to be rolled back
   - Migration causes issues in production
   - User requests rollback

2. Plan rollback procedure:
   - Execute downgrade function
   - Restore data if data migration
   - Verify rollback completed
   - Validate schema after rollback

3. Execute rollback:
   - Downgrade to previous migration version
   - Apply downgrade functions in reverse order
   - Monitor rollback progress
   - Log rollback details

4. Handle rollback failures:
   - Alert if rollback fails
   - Use backup to restore
   - Investigate rollback failure

### Step 8: Database Versioning

1. Track database version:
   - Store current migration version in database
   - Alembic stores in `alembic_version` table
   - Compare current version to target version

2. Detect schema drift:
   - Compare expected schema to actual schema
   - Identify uncommitted changes
   - Identify manual database modifications

3. Synchronize schema versions:
   - Run pending migrations to catch up
   - Alert on schema drift
   - Document manual changes

### Step 9: Migration Testing Strategy

1. Design migration tests:
   - Test upgrade path (staging)
   - Test downgrade path (staging)
   - Test data integrity
   - Test application compatibility
   - Test performance impact

2. Test scenarios:
   - Test with empty database
   - Test with sample data
   - Test with production-like data volume
   - Test concurrent access (if applicable)

3. Validate migration:
   - Schema matches expected state
   - All constraints enforced
   - Indexes created
   - Data preserved

### Step 10: Environment Synchronization

1. Ensure database versions consistent across environments:
   - Development: Latest migrations applied
   - Staging: Latest migrations applied
   - Production: Latest migrations applied (maybe lagging)

2. Plan migration rollout:
   - Deploy to development first
   - Deploy to staging for testing
   - Deploy to production with approval

3. Handle version differences:
   - Apply missing migrations in each environment
   - Roll back incompatible changes
   - Document version differences

## Outputs

### Primary Output: Database Migration Specification

```yaml
database_migration_specification:
  meta:
    feature_spec: string
    database_spec: string
    current_version: string
    target_version: string
    generated_at: datetime
    version: string

  migration:
    version: string  # e.g., "0001"
    name: string  # e.g., "create_users_table"
    description: string
    author: string
    created_at: datetime

    upgrade:
      operations:
        - type: enum(create_table|drop_table|add_column|drop_column|alter_column|add_index|drop_index|add_constraint|drop_constraint|bulk_insert|bulk_update)
          table: string
          details: object  # Column definition, index definition, etc.
          sql: string  # Raw SQL if needed
          data_migration: boolean
          transform: string  # Data transformation logic

    downgrade:
      operations:
        - type: enum(create_table|drop_table|add_column|drop_column|alter_column|add_index|drop_index|add_constraint|drop_constraint)
          table: string
          details: object
          sql: string
          data_rollback: string  # Data rollback logic

    risk:
      level: enum(low|medium|high|critical)
      potential_downtime: boolean
      data_loss_risk: boolean
      irreversible_changes: boolean

    breaking_changes:
      - type: enum(dropping_column|dropping_table|incompatible_type|constraint_removal)
        table: string
        column: string
        mitigation_strategy: string

  validation:
    pre_execution:
      schema_check: boolean
      data_check: boolean
      dependency_check: boolean

    post_execution:
      schema_check: boolean
      data_check: boolean
      constraint_check: boolean
      index_check: boolean
      referential_integrity_check: boolean

    rollback:
      tested: boolean
      automated: boolean
      requires_manual: boolean

  data_migration:
    enabled: boolean
    source_table: string
    destination_table: string
    transform_logic: string
    validation_logic: string

    backup:
      created: boolean
      backup_id: string
      retention_days: int

  execution_plan:
    steps:
      - step: string  # Step description
        operation: enum(upgrade|validate|backup|migrate_data|verify)
        dependencies: [string]
        requires_downtime: boolean
        estimated_duration_seconds: int
        risk: string

    rollback_steps:
      - step: string
        operation: enum(downgrade|restore_backup|verify)
        dependencies: [string]

  compatibility:
    application_versions:
      min: string  # Minimum application version compatible
      max: string  # Maximum application version compatible

    api_impact:
      endpoints_affected: [string]  # Endpoints that need updating
      breaking: boolean

    deprecated_features:
      - feature: string
        version_removed: string
        migration_removal: string

  rollback_plan:
    enabled: boolean
    automatic: boolean
    steps: [string]
    fallback_to_backup: boolean

  environment_sync:
    - environment: enum(development|staging|production)
      current_version: string
      target_version: string
      status: enum(synced|pending|ahead|behind)
      migrations_to_apply: [string]

  testing:
    unit_tests:
      - test_name: string
        description: string
        data_fixture: string

    integration_tests:
      - test_name: string
        description: string
        endpoint: string
        expected_behavior: string

    performance_tests:
      - test_name: string
        query: string
        expected_improvement: string

    rollback_tests:
      - test_name: string
        scenario: string
        validation_checks: [string]

  documentation:
    changelog_entry:
      version: string
      changes: [string]
      breaking_changes: [string]
      upgrade_instructions: string
      rollback_instructions: string
```

### Secondary Outputs

1. **Migration Script Template**:
   ```python
   # File: migrations/versions/0001_create_users_table.py
   from alembic import op
   import sqlalchemy as sa
   from sqlalchemy.dialects import postgresql

   revision = '0001'
   down_revision = None

   def upgrade() -> None:
       # Create users table
       op.create_table(
           'users',
           sa.Column('id', sa.Integer(), primary_key=True),
           sa.Column('email', sa.String(), unique=True, nullable=False),
           sa.Column('hashed_password', sa.String(), nullable=False),
           sa.Column('created_at', sa.DateTime(), server_default=sa.func.now()),
           sa.Column('updated_at', sa.DateTime(), onupdate=sa.func.now()),
       )
       op.create_index('ix_users_email', 'users', ['email'])

   def downgrade() -> None:
       op.drop_index('ix_users_email', table_name='users')
       op.drop_table('users')
   ```

2. **Documentation**:
   - Changelog of all migrations
   - Breaking changes and their impact
   - Data migration requirements
   - Rollback procedures

3. **Migration Execution Record**:
   ```python
   record:
       migration_version: str
       executed_at: datetime
       environment: str
       user: str
       success: boolean
       error: str  # If failed
   ```

## Scope & Boundaries

### This Skill MUST:

- Analyze schema changes and migration requirements
- Plan migration sequences and dependencies
- Design migration scripts (upgrade and downgrade)
- Handle breaking changes with zero-downtime strategies
- Plan and execute data migrations
- Validate migrations before and after execution
- Execute migrations with transaction management
- Plan and execute rollbacks
- Manage database versioning
- Test migrations in staging
- Synchronize environments

### This Skill MUST NOT:

- Implement actual SQL or ORM code for models
- Create database tables or schemas directly
- Write actual Alembic migration files
- Execute migrations on production database
- Create SQLModel class definitions
- Implement data transformation logic (only design)
- Modify database schemas directly
- Write actual database query code
- Configure Alembic or migration framework
- Write production migration execution code

### Boundary Examples

**In Scope:**
- Analyze schema change: Add `completed_at` column to `todos` table
- Plan migration sequence: 1) Add nullable column, 2) Populate data, 3) Make non-null
- Design rollback: Remove column (accepting data loss if backup exists)
- Validate migration: Check column exists, verify data integrity
- Plan zero-downtime: Multi-step migration for production deployment

**Out of Scope:**
- Implement: `op.create_table('users', ...)` code
- Write: `class User(SQLModel, table=True): ...` model definition
- Execute: `alembic upgrade head` command
- Create: `migrations/versions/0001_create_users.py` file
- Write: `def upgrade() -> None: op.create_table(...)` Python code
- Execute SQL: `CREATE TABLE users (...);` in database
- Write data transformation code
- Configure Alembic configuration file

## Dependencies

### Required Dependencies

1. **Spec-Kit Plus Schema**
   - Location: `/specs/.spec-kit/schema.md`
   - Purpose: Defines specification file structure

2. **Project Configuration**
   - Location: `/specs/.spec-kit/config.md`
   - Purpose: Provides migration framework details (Alembic)

### Specification Dependencies

1. **Database Specs**
   - Location: `/specs/database/*.md`
   - Purpose: Define schema changes and migration requirements

2. **Architecture Specs**
   - Location: `/specs/architecture/*.md`
   - Purpose: Define migration architecture and strategies

### Skill Dependencies

1. **Database Modeling Skill**
   - Purpose: Understand database models and schema
   - Used to analyze schema changes

2. **Spec Interpretation Skill**
   - Purpose: Parse and understand database specifications
   - Used to extract migration requirements

### Optional Dependencies

1. **API Construction Skill**
   - Purpose: Understand API endpoints affected by schema changes
   - Used to plan API impact of migrations

2. **Task Business Logic Skill**
   - Purpose: Understand business logic affected by schema changes
   - Used to plan compatibility testing

## Used By Agents

### Primary Consumers

1. **General-Purpose Agents**
   - When planning database schema changes
   - When designing migration scripts
   - When planning data migrations
   - When managing database versions

2. **Backend Implementation Agents**
   - When implementing migration scripts
   - When writing Alembic migrations
   - When executing database migrations
   - When managing rollback procedures

3. **Plan Agents (Software Architect)**
   - When designing migration architecture
   - When planning schema evolution strategy
   - When planning zero-downtime migrations

4. **DevOps Agents**
   - When deploying migrations to environments
   - When managing database backups
   - When monitoring migration execution

### Secondary Consumers

1. **Testing & QA Agents**
   - When testing migrations
   - When validating migration rollback
   - When testing schema compatibility

2. **Infrastructure Agents**
   - When managing database infrastructure
   - When configuring backup and recovery

## Integration Notes

### Calling Convention

```yaml
skill: backend-database-migration
inputs:
  database_spec: string  # From Database Modeling Skill
  current_version: string
  target_version: string
  migration_type: enum(schema_change|data_migration|breaking_change)
  environment: enum(development|staging|production)
  context:
    create_backup: boolean
    rollback_required: boolean
    zero_downtime: boolean
  output_format: database_migration_specification
```

### Error Handling

- **Invalid Migration**: Return error with validation details
- **Migration Failed**: Rollback if transaction failed
- **Rollback Failed**: Alert critical failure
- **Schema Drift**: Alert on uncommitted changes
- **Incompatible Version**: Alert on version conflict

### Migration Best Practices

- Always write downgrade functions for reversible migrations
- Test migrations in staging before production
- Use transactions to ensure atomicity
- Validate migrations before and after execution
- Document breaking changes and impact
- Plan for zero-downtime when possible
- Create backups before production migrations
- Monitor migration execution and performance
- Test rollback in staging environment
- Keep migrations idempotent (safe to run multiple times)

### Zero-Downtime Migration Strategies

**Add Non-Null Column**:
1. Add column as nullable
2. Populate column with default values
3. Make column non-null
4. Remove default value (if needed)

**Modify Column Type**:
1. Create new column with new type
2. Copy data from old column to new column
3. Verify data integrity
4. Drop old column
5. Rename new column to old column

**Drop Column**:
1. Ignore column in application code (deprecate)
2. Remove references in new code
3. Drop column (after old code is deprecated)

### Alembic Configuration

```ini
# alembic.ini
[alembic]
script_location = migrations
version_path = migrations/versions
sqlalchemy.url = postgresql://user:pass@localhost/dbname

[post_write_hooks]
# Generate migration documentation
```

### Migration Testing Strategies

**Unit Tests**:
- Test upgrade() function
- Test downgrade() function
- Test idempotency

**Integration Tests**:
- Test migration on sample database
- Test with realistic data
- Test rollback

**Performance Tests**:
- Test migration performance on large datasets
- Test application performance after migration
- Compare query performance before and after

---

**Version:** 1.0.0
**Last Updated:** 2026-01-02
**Maintainer:** Spec-Kit Plus AI Agent System
