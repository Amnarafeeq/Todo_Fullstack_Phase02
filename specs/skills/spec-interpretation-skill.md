# Spec Interpretation Skill

## Purpose

To read, parse, understand, and translate Spec-Kit Plus markdown specifications into structured, actionable implementation plans. This skill serves as the foundational reasoning layer that bridges human-authored specifications and agent-driven code generation.

## When to Use (Trigger Conditions)

This skill should be invoked when:

- An agent needs to understand project requirements from a specification file
- A new feature, enhancement, or bug fix is to be implemented based on a spec
- An agent needs to reconcile conflicting or ambiguous specification content
- Implementation decisions must be made based on documented requirements
- Cross-specification dependencies or relationships need to be analyzed
- A spec-driven development workflow is being executed

**Triggers:**
- User provides a spec file path or reference
- Agent receives an instruction referencing a specific spec
- Multi-step implementation tasks are initiated
- Spec validation or compliance checking is required

## Inputs

### Required Inputs

1. **Specification File Path**
   - Format: String path relative to `/specs/` directory
   - Examples: `features/todo-crud.md`, `api/routes/auth.md`, `architecture/database.md`

2. **Project Context** (Optional but recommended)
   - Current tech stack configuration
   - Existing implemented features state
   - Current phase of development

### Supported Specification Types

| Spec Type | Location Pattern | Purpose |
|-----------|-----------------|---------|
| Feature Specs | `/specs/features/*.md` | Feature requirements, user stories, acceptance criteria |
| API Specs | `/specs/api/*.md` | API endpoints, request/response formats, error handling |
| Database Specs | `/specs/database/*.md` | Models, relationships, migrations, constraints |
| Architecture Specs | `/specs/architecture/*.md` | System design, patterns, integration points |
| Auth Specs | `/specs/auth/*.md` | Authentication flows, authorization rules, token handling |
| UI/UX Specs | `/specs/ui/*.md` | Component layouts, interactions, styling requirements |
| Skill Specs | `/specs/skills/*.md` | AI skill definitions, trigger conditions, outputs |

### Specification Format Expectations

Specs MUST follow Spec-Kit Plus conventions:
- Frontmatter metadata (title, priority, status, dependencies)
- Markdown sections with standardized headers
- Clear separation of requirements vs implementation notes
- Version and changelog sections

## Actions

### Step 1: Specification Ingestion
1. Locate and read the specified markdown file
2. Parse frontmatter metadata (title, priority, status, dependencies, version)
3. Extract all markdown section content
4. Validate file structure against Spec-Kit Plus schema

### Step 2: Dependency Analysis
1. Identify all explicit dependencies in spec frontmatter
2. Scan specification content for implicit references (other specs, models, endpoints)
3. Build dependency graph and detect circular references
4. Determine implementation order for dependent specs

### Step 3: Requirement Extraction
1. Parse functional requirements into discrete, testable statements
2. Extract non-functional requirements (performance, security, scalability)
3. Identify acceptance criteria and success metrics
4. Separate mandatory vs optional features

### Step 4: Constraint Identification
1. Extract technical constraints (technology choices, integration points)
2. Identify business constraints (deadlines, budget, resources)
3. Document architectural boundaries and integration requirements
4. Note security and compliance requirements

### Step 5: Ambiguity Resolution
1. Flag ambiguous language or conflicting requirements
2. Cross-reference with related specifications for clarity
3. Apply default conventions when explicitly documented
4. Generate clarification questions if unresolvable

### Step 6: Structure Mapping
1. Map requirements to project layers (frontend, backend, database, auth)
2. Identify affected components, modules, and services
3. Determine CRUD operations and API endpoints needed
4. Outline UI components and page routes required

### Step 7: Validation
1. Verify specification completeness against project standards
2. Check consistency with existing codebase and architecture
3. Validate that all referenced dependencies exist and are accessible
4. Ensure acceptance criteria are measurable and verifiable

## Outputs

### Primary Output: Structured Implementation Plan

```yaml
specification:
  meta:
    title: string
    file_path: string
    version: string
    status: string
    priority: string

  analysis:
    requirements:
      functional: [string]  # Testable requirement statements
      non_functional: [string]
    constraints:
      technical: [string]
      business: [string]
      security: [string]
    dependencies:
      explicit: [spec_file_paths]
      implicit: [spec_file_paths]
      circular: boolean

  implementation_plan:
    phases:
      - name: string
        sequence: number
        tasks:
          - description: string
            layer: enum(frontend|backend|database|auth|infrastructure)
            components: [string]
            acceptance_criteria: [string]
            dependencies: [task_ids]
        blockers: [string]
        risks: [string]

    affected_files:
      frontend: [file_patterns]
      backend: [file_patterns]
      database: [file_patterns]
      tests: [file_patterns]

    integration_points:
      - type: enum(api|database|auth|external_service)
        endpoint/model_name: string
        operation: enum(create|read|update|delete|auth|validate)

  validation:
    completeness: enum(partial|complete|insufficient)
    consistency: enum(consistent|conflicts_detected)
    clarity: enum(clear|ambiguous|confusing)
    flags: [string]
    clarifications_needed: [string]
```

### Secondary Outputs

1. **Dependency Graph**: Visual representation of spec relationships
2. **Risk Assessment**: Identified implementation risks and mitigation strategies
3. **Clarification Requests**: Questions to resolve ambiguous requirements
4. **Compliance Checklist**: Verification items for spec-driven development

## Scope & Boundaries

### This Skill MUST:

- Parse and interpret markdown specification files
- Extract structured requirements from narrative text
- Map abstract requirements to concrete technical tasks
- Identify dependencies and integration points
- Generate actionable implementation plans
- Detect specification inconsistencies or ambiguities

### This Skill MUST NOT:

- Generate application code (frontend, backend, database, or tests)
- Make architectural decisions not documented in specs
- Infer requirements beyond what is explicitly stated
- Modify specification files
- Implement features or write code
- Execute build, test, or deployment commands
- Access or analyze existing codebase (unless validating consistency)
- Make business decisions or prioritize features

### Boundary Examples

**In Scope:**
- Parse "Create todo item" requirement → Map to POST /api/todos endpoint + createTodo mutation
- Extract "JWT authentication" constraint → Identify Better Auth integration task
- Identify dependency on User model → Add database model verification task

**Out of Scope:**
- Write the createTodo API endpoint handler
- Configure Better Auth provider settings
- Generate User SQLModel class definition
- Run migration scripts

## Dependencies

### Required Dependencies

1. **Spec-Kit Plus Schema**
   - Location: `/specs/.spec-kit/schema.md` or project configuration
   - Purpose: Defines specification file structure and metadata schema

2. **Project Configuration**
   - Location: `/specs/.spec-kit/config.md` or root config file
   - Purpose: Provides tech stack, directory structure, and conventions

### Optional Dependencies

1. **Glossary Spec**
   - Location: `/specs/docs/glossary.md`
   - Purpose: Standardizes terminology for consistent interpretation

2. **Pattern Library Spec**
   - Location: `/specs/architecture/patterns.md`
   - Purpose: Provides architectural patterns for mapping requirements

### External Dependencies

- None (skill operates entirely on spec files and project configuration)

## Used By Agents

### Primary Consumers

1. **General-Purpose Agents**
   - When executing spec-driven implementation tasks
   - When planning multi-step feature development
   - When validating requirements before coding

2. **Plan Agents (Software Architect)**
   - When designing implementation strategies
   - When creating phased development plans
   - When identifying architectural impacts

3. **Feature Implementation Agents**
   - When translating specs to code changes
   - When determining which files to modify
   - When validating implementation against requirements

### Secondary Consumers

1. **Code Review Agents**
   - When validating implementations against original specifications
   - When ensuring acceptance criteria are met

2. **Test Generation Agents**
   - When deriving test cases from acceptance criteria
   - When creating integration test scenarios

3. **Documentation Agents**
   - When generating API documentation from specs
   - When creating user-facing feature documentation

## Integration Notes

### Calling Convention

```yaml
skill: "spec-interpretation"
inputs:
  spec_file: "features/todo-crud.md"
  context:
    current_phase: "Phase II"
    implemented_features: ["auth", "user-profile"]
  output_format: "structured_plan"
```

### Error Handling

- **Invalid Spec Path**: Return error with valid spec locations
- **Missing Metadata**: Use defaults with warning flag
- **Circular Dependencies**: Return analysis with critical flag
- **Unresolvable Ambiguities**: Return partial plan with clarification requests

### Performance Considerations

- Cache parsed specifications for reuse in multi-spec workflows
- Parallelize dependency graph construction for large spec sets
- Stream output for large implementation plans

---

**Version:** 1.0.0
**Last Updated:** 2026-01-01
**Maintainer:** Spec-Kit Plus AI Agent System
