# Database Modeling Skill

## Purpose

To design, validate, and evolve database schemas and ORM models based on feature and database specifications. This skill translates business requirements into normalized database structures, relationships, and constraints while adhering to SQLModel and Neon PostgreSQL best practices. It serves as the reasoning layer for data persistence design decisions.

## When to Use (Trigger Conditions)

This skill should be invoked when:

- A new feature requires persistent data storage
- Database specifications reference new entities, relationships, or constraints
- Existing models need modification or extension
- Data integrity rules, indexes, or constraints need to be defined
- Performance optimization requires schema changes (denormalization, indexing strategies)
- Migration planning is needed for schema evolution
- Referential integrity or cascade behavior needs specification
- Schema validation or normalization analysis is required

**Triggers:**
- Feature spec introduces new domain entities
- Database spec defines new models or relationships
- Auth spec requires user-related tables
- API spec indicates CRUD operations needing persistence
- Performance spec identifies query optimization needs

## Inputs

### Required Inputs

1. **Database Specification File**
   - Format: String path relative to `/specs/` directory
   - Examples: `database/models/todo.md`, `database/relationships/user-todo.md`, `features/todo-crud.md`

2. **Existing Schema State** (Optional but recommended)
   - Current models defined in the codebase
   - Existing table structures and relationships
   - Migration history for version tracking

3. **Performance Requirements** (Optional)
   - Expected data volume
   - Query frequency patterns
   - Latency requirements

### Supported Specification Types

| Spec Type | Location Pattern | Purpose |
|-----------|-----------------|---------|
| Database Specs | `/specs/database/*.md` | Model definitions, relationships, constraints |
| Feature Specs | `/specs/features/*.md` | Domain entities, data requirements |
| Auth Specs | `/specs/auth/*.md` | User models, session models, auth-related tables |
| API Specs | `/specs/api/*.md` | Data access patterns, query requirements |
| Architecture Specs | `/specs/architecture/*.md` | Data layer design, persistence patterns |

### Specification Format Expectations

Database specs MUST include:
- Entity definitions with attributes and types
- Relationship specifications (one-to-one, one-to-many, many-to-many)
- Constraints (unique, not null, check constraints, indexes)
- Business rules requiring database enforcement
- Cascading behavior requirements
- Migration notes for schema evolution

## Actions

### Step 1: Entity Identification
1. Extract all domain entities from specification
2. Identify attributes for each entity with data types
3. Determine primary key candidates (prefer UUIDs for Neon PostgreSQL)
4. Classify entities as concrete or abstract (inheritance hierarchies)
5. Identify value objects vs entity types

### Step 2: Relationship Analysis
1. Identify all entity relationships from specification
2. Classify relationship types:
   - One-to-One (1:1)
   - One-to-Many (1:N)
   - Many-to-Many (N:M)
3. Determine ownership and foreign key placement
4. Specify cascade behavior (CASCADE, SET NULL, RESTRICT, NO ACTION)
5. Identify junction tables for many-to-many relationships

### Step 3: Schema Normalization
1. Apply normalization rules to eliminate redundancy:
   - 1NF: Atomic values, no repeating groups
   - 2NF: No partial dependencies on composite keys
   - 3NF: No transitive dependencies
2. Identify denormalization opportunities for read performance
3. Balance normalization vs query optimization
4. Validate against business rules and access patterns

### Step 4: Constraint Design
1. Define column-level constraints:
   - NOT NULL for required fields
   - DEFAULT values for optional fields
   - CHECK constraints for business rules
   - Data type validation
2. Define table-level constraints:
   - UNIQUE constraints for natural keys
   - COMPOSITE UNIQUE for multi-field uniqueness
   - EXCLUDE constraints for exclusion rules
3. Define referential integrity constraints
4. Document trigger requirements for complex validations

### Step 5: Index Strategy
1. Identify primary key indexes (automatic)
2. Design indexes for foreign keys (standard practice)
3. Analyze query patterns for index candidates:
   - WHERE clause columns
   - JOIN condition columns
   - ORDER BY columns
   - Composite indexes for multi-column queries
4. Determine index types:
   - B-Tree (default, for equality and range queries)
   - GIN (for array/jsonb columns)
   - BRIN (for large tables with sequential data)
5. Consider write vs read performance tradeoffs

### Step 6: SQLModel Mapping
1. Map database types to Python/SQLModel types:
   - UUID → UUID (primary key standard)
   - VARCHAR → str(max_length)
   - TEXT → str
   - INTEGER → int
   - BIGINT → int
   - DECIMAL/NUMERIC → Decimal
   - BOOLEAN → bool
   - TIMESTAMP → datetime
   - JSONB → dict
   - ARRAY → list
2. Define relationship types:
   - RelationshipMode.LINKED (direct foreign key)
   - RelationshipMode.BACK_POPULATES (bidirectional)
   - RelationshipMode.COMPUTED (read-only derived)
3. Specify lazy vs eager loading strategies
4. Identify computed fields and validators

### Step 7: Migration Planning
1. Compare proposed schema against existing state
2. Identify breaking changes requiring data migration
3. Determine migration sequence (dependencies)
4. Plan data transformation scripts for schema changes
5. Identify rollback strategies for each migration
6. Validate that migrations are reversible where possible

### Step 8: Validation
1. Check for circular dependencies that could cause issues
2. Validate foreign key references are to existing entities
3. Ensure all relationships have cascade behavior defined
4. Verify constraint rules don't conflict
5. Check index strategies for redundancy or conflicts
6. Validate against SQLModel and Neon PostgreSQL capabilities

## Outputs

### Primary Output: Schema Design Specification

```yaml
database_schema:
  meta:
    spec_file: string
    version: string
    previous_version: string  # null for new schemas

  entities:
    - name: string
      table_name: string  # snake_case
      primary_key:
        column_name: string
        type: UUID  # or other type
        auto_generate: boolean

      columns:
        - name: string  # snake_case
          python_name: string  # camelCase for SQLModel
          database_type: enum(uuid|varchar|text|integer|bigint|decimal|boolean|timestamp|jsonb|array)
          python_type: string
          nullable: boolean
          default: any
          constraints:
            - enum(primary_key|unique|not_null|check)
            check_expression: string  # for CHECK constraints
          indexed: boolean

      relationships:
        - type: enum(one_to_one|one_to_many|many_to_many)
          related_entity: string
          foreign_key_column: string  # on child table
          back_populates: string  # on parent table
          cascade: enum(save_update|merge|expunge|delete|delete_orphan|all)
          lazy: boolean
          join_table: string  # for many_to_many only
          join_table_columns:
            - entity_column: string
              related_column: string

      computed_fields:
        - name: string
          type: string
          expression: string  # SQL expression or Python computation

      constraints:
        - type: enum(unique|check|exclude)
          columns: [string]
          expression: string  # for check/exclude constraints
          name: string  # constraint name

  indexes:
    - table_name: string
      columns: [string]
      index_name: string
      index_type: enum(btree|gin|brin|hash)
      unique: boolean
      condition: string  # partial index condition (optional)

  migration_plan:
    is_new_schema: boolean
    breaking_changes:
      - change_type: enum(column_drop|column_rename|table_drop|constraint_change)
        table: string
        affected_columns: [string]
        data_migration_required: boolean
        migration_script_path: string

    new_entities: [string]
    modified_entities: [string]
    dependencies: [migration_steps]
    rollback_plan:
      reversible: boolean
      rollback_steps: [string]

  performance_considerations:
    estimated_row_counts:  # per table
      table_name: int
    query_optimization_notes: [string]
    indexing_strategy: string
    denormalization_recommendations: [string]

  sqlmodel_config:
    table_args:
      - string  # table-level SQL options
    relationship_config:
      - entity: string
        relationship: string
        mode: enum(linked|back_populated|computed)
    validation_rules: [string]
```

### Secondary Outputs

1. **Entity-Relationship Diagram (ERD) Description**: Text description of schema relationships
2. **Data Dictionary**: Field-level documentation for all entities
3. **Constraint Violation Scenarios**: Edge cases and validation rules
4. **Query Pattern Analysis**: Recommended query strategies based on schema design

## Scope & Boundaries

### This Skill MUST:

- Design normalized database schemas based on specifications
- Define entity relationships and cascade behaviors
- Specify constraints, indexes, and validation rules
- Map database types to SQLModel/Python types
- Plan migrations for schema evolution
- Analyze performance implications of schema decisions
- Identify data integrity requirements
- Generate schema design specifications

### This Skill MUST NOT:

- Generate SQL DDL statements (CREATE TABLE, ALTER TABLE, etc.)
- Write SQLModel class definitions
- Create Alembic migration scripts
- Execute database operations or migrations
- Access actual database instances
- Write application code (Python, TypeScript, or other)
- Make architectural decisions beyond data persistence layer
- Optimize actual query performance (only design-level recommendations)
- Define API endpoints or services

### Boundary Examples

**In Scope:**
- Design "Todo" entity with id, title, completed, created_at columns
- Specify User hasMany Todos relationship with cascade delete
- Recommend index on Todo.user_id for join performance
- Plan migration to add priority column to Todo table
- Define CHECK constraint: todo.completed_at must be null if completed is false

**Out of Scope:**
- Write `class Todo(SQLModel, table=True): ...`
- Generate `CREATE TABLE todos (...)` SQL
- Create Alembic migration script
- Write TodoRepository class
- Execute `alembic upgrade head` command
- Query the database for actual data

## Dependencies

### Required Dependencies

1. **Spec-Kit Plus Schema**
   - Location: `/specs/.spec-kit/schema.md`
   - Purpose: Defines specification file structure

2. **Project Configuration**
   - Location: `/specs/.spec-kit/config.md`
   - Purpose: Provides tech stack details (SQLModel, Neon PostgreSQL)

### Specification Dependencies

1. **Database Specs**
   - Location: `/specs/database/*.md`
   - Purpose: Primary source for model definitions and relationships

2. **Feature Specs**
   - Location: `/specs/features/*.md`
   - Purpose: Define business entities and data requirements

3. **Auth Specs**
   - Location: `/specs/auth/*.md`
   - Purpose: Define user models and auth-related entities

4. **Architecture Specs**
   - Location: `/specs/architecture/*.md`
   - Purpose: Provide data layer patterns and conventions

### Skill Dependencies

1. **Spec Interpretation Skill**
   - Purpose: Parse and understand specification requirements
   - Used to extract entities, relationships, and constraints from specs

### Optional Dependencies

1. **Existing Schema**
   - Location: Codebase models directory
   - Purpose: Provide context for migration planning

2. **Performance Specs**
   - Location: `/specs/performance/*.md`
   - Purpose: Inform indexing and optimization strategies

## Used By Agents

### Primary Consumers

1. **General-Purpose Agents**
   - When implementing features requiring data persistence
   - When creating CRUD operations based on specs
   - When validating schema design before code generation

2. **Plan Agents (Software Architect)**
   - When designing database architecture for new features
   - When planning migration strategies
   - When identifying data modeling impacts of architectural changes

3. **Backend Implementation Agents**
   - When creating SQLModel classes based on schema design
   - When writing database access code (repositories, services)
   - When implementing data validation logic

4. **Migration Agents**
   - When generating Alembic migration scripts
   - When planning data transformation steps
   - When creating rollback procedures

### Secondary Consumers

1. **Test Generation Agents**
   - When creating database test fixtures
   - When generating test data scenarios
   - When writing integration tests for data access

2. **API Implementation Agents**
   - When designing request/response DTOs based on models
   - When mapping API endpoints to database operations

3. **Frontend Agents**
   - When understanding data structures for type generation
   - When designing state management based on schema relationships

## Integration Notes

### Calling Convention

```yaml
skill: "database-modeling"
inputs:
  database_spec: "database/models/todo.md"
  feature_specs: ["features/todo-crud.md", "features/todo-filtering.md"]
  existing_models: boolean  # true if models exist, false for new schema
  performance_context:
    expected_rows_per_table:
      todos: 1000000
      users: 10000
  output_format: "schema_specification"
```

### Error Handling

- **Circular Dependencies**: Return schema with warning flag and impact analysis
- **Invalid Constraints**: Flag constraint violations and suggest alternatives
- **Conflicting Relationships**: Identify conflicts and request clarification
- **Unsupported Types**: Flag Neon PostgreSQL incompatibilities
- **Migration Conflicts**: Identify breaking changes requiring manual intervention

### Performance Considerations

- Cache schema designs for referenced entities across multiple calls
- Parallelize relationship analysis for large entity sets
- Stream output for schemas with many entities

### SQLModel + Neon PostgreSQL Specifics

- Default primary keys to UUID type for Neon PostgreSQL performance
- Use snake_case for table and column names
- Use camelCase for SQLModel Python field names
- Leverage Neon PostgreSQL features: generated columns, partial indexes
- Consider connection pooling implications for schema design
- Account for Neon's serverless architecture in index strategy

---

**Version:** 1.0.0
**Last Updated:** 2026-01-01
**Maintainer:** Spec-Kit Plus AI Agent System
