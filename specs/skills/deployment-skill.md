# Deployment Skill

## Purpose

To prepare, configure, and deploy the full-stack Todo application to production, including both frontend and backend services. This skill manages environment variables, deployment targets, build processes, and ensures the app runs correctly in a production environment. It serves as the reasoning layer for deployment orchestration, handling the transition from development to production across all layers (frontend, backend, database, infrastructure).

## When to Use (Trigger Conditions)

This skill should be invoked when:

- A new feature or feature set needs to be deployed to production
- Hotfix or bugfix needs to be deployed urgently
- Scheduled release or version upgrade is being executed
- Environment setup is needed (development, staging, production)
- CI/CD pipeline is being designed or modified
- Rollback to previous deployment is required
- Blue-green deployment or canary release is being planned
- Infrastructure provisioning or scaling is needed
- Environment variables or secrets need to be configured
- Database migrations need to be executed as part of deployment
- Monitoring and observability setup is required
- Zero-downtime deployment strategy is being implemented

**Triggers:**
- Feature implementation complete and ready for deployment
- Pull request merged to main branch
- CI/CD pipeline triggered
- Manual deployment requested
- Scheduled deployment window reached
- Emergency hotfix required
- Environment provisioning needed

## Inputs

### Required Inputs

1. **Application Configuration**
   - Frontend configuration (package.json, next.config.js, tailwind.config.ts)
   - Backend configuration (requirements.txt, pyproject.toml, main.py)
   - Build configuration (scripts, build commands, environment-specific configs)

2. **Environment Variables and Secrets**
   - Frontend environment variables (API URLs, feature flags, etc.)
   - Backend environment variables (database URLs, JWT secrets, API keys, etc.)
   - Sensitive secrets (passwords, tokens, private keys) from secret store
   - Database connection strings and credentials
   - OAuth provider credentials (if applicable)

3. **Deployment Target**
   - Target environment: enum(development|staging|production)
   - Deployment platform: enum(vercel|netlify|aws|gcp|azure|docker|kubernetes|custom)
   - Infrastructure configuration (cloud provider, region, instance types)
   - Domain configuration (custom domains, SSL certificates)

4. **Feature Specifications**
   - Feature specs to understand what's being deployed
   - Database migration specs (if schema changes included)
   - API specs (if new endpoints being deployed)
   - Architecture specs (infrastructure requirements)

### Supported Specification Types

| Spec Type | Location Pattern | Purpose |
|-----------|-----------------|---------|
| Deployment Specs | `/specs/deployment/*.md` | Deployment targets, environment configs, CI/CD pipelines |
| Infrastructure Specs | `/specs/infrastructure/*.md` | Cloud resources, scaling, monitoring setup |
| Database Specs | `/specs/database/*.md` | Migration scripts, schema changes |
| Architecture Specs | `/specs/architecture/*.md` | Infrastructure patterns, deployment strategies |

### Specification Format Expectations

Deployment specs MUST include:
- Deployment targets and environments (dev, staging, prod)
- Build and deployment commands
- Environment variable requirements
- Database migration requirements
- Rollback procedures
- Health check endpoints
- Monitoring and alerting setup

## Actions

### Step 1: Pre-Deployment Validation
1. Validate all requirements are met:
   - All feature implementations are complete
   - All tests pass (unit, integration, e2e)
   - Code review is approved
   - No critical issues remaining
2. Validate environment configuration:
   - All required environment variables are defined
   - Secrets are available and accessible
   - Database connection is valid
   - External services are accessible
3. Validate infrastructure readiness:
   - Target environment is provisioned
   - Resources are available (servers, databases, storage)
   - Network configuration is correct
   - SSL certificates are valid
4. Validate compatibility:
   - Frontend and backend versions are compatible
   - Database schema changes are compatible with existing data
   - API contracts are backward compatible
   - Dependencies are up-to-date and secure

### Step 2: Build Preparation
1. Prepare frontend build:
   - Set Next.js build mode (production)
   - Configure environment variables for build-time
   - Optimize assets (images, fonts, CSS)
   - Generate static pages where applicable
   - Enable production optimizations (minification, compression)
2. Prepare backend build:
   - Install production dependencies (pip install with requirements.txt)
   - Compile TypeScript (if applicable)
   - Bundle or prepare application files
   - Verify all dependencies are production-ready
3. Prepare database build:
   - Review migration scripts
   - Validate migration compatibility
   - Test migrations on staging environment
   - Prepare rollback migration scripts
4. Prepare deployment artifacts:
   - Create deployment packages
   - Generate build metadata (version, timestamp, commit hash)
   - Create deployment manifests (Dockerfiles, Kubernetes manifests, etc.)
   - Generate checksums for artifact integrity

### Step 3: Environment Configuration
1. Configure frontend environment:
   - Set production API base URLs
   - Configure feature flags (enable/disable features)
   - Set analytics and monitoring keys
   - Configure authentication (auth endpoints, callback URLs)
   - Set CDN URLs if applicable
2. Configure backend environment:
   - Set database connection strings (Neon PostgreSQL)
   - Set JWT secrets (signing keys, refresh token secrets)
   - Set API keys (if integrating external services)
   - Configure CORS allowed origins
   - Set rate limiting thresholds
   - Configure logging levels and endpoints
   - Set monitoring and observability endpoints
3. Configure database environment:
   - Set database connection pools
   - Configure replication if applicable
   - Set backup schedules
   - Configure performance parameters
4. Configure secrets:
   - Load secrets from secure store (AWS Secrets Manager, HashiCorp Vault, etc.)
   - Verify secret encryption and access controls
   - Set secret rotation policies

### Step 4: Deployment Strategy Selection
1. Select deployment strategy based on requirements:
   - **Rolling Deployment**: Replace instances one by one (zero downtime for stateless apps)
   - **Blue-Green Deployment**: Deploy to new environment, switch traffic (instant rollback)
   - **Canary Deployment**: Deploy to small subset, gradually increase traffic (risk mitigation)
   - **Recreate Deployment**: Stop all, deploy new, start all (simple but has downtime)
2. Configure deployment strategy:
   - Set instance counts and traffic split percentages
   - Configure health checks and failure thresholds
   - Set rollback conditions and triggers
   - Configure deployment timeout and retry logic
3. Plan rollback procedure:
   - Document rollback steps
   - Prepare previous version artifacts
   - Set rollback triggers (health check failures, error rates)
   - Define rollback timeout and success criteria

### Step 5: Frontend Deployment
1. Deploy frontend application:
   - Build Next.js application: `npm run build` or `yarn build`
   - Deploy to platform:
     - **Vercel**: `vercel deploy --prod`
     - **Netlify**: `netlify deploy --prod`
     - **Docker**: Build and push image, deploy to container registry
     - **Kubernetes**: Apply deployment manifests
     - **AWS S3/CloudFront**: Upload build artifacts, configure CDN
2. Configure frontend infrastructure:
   - Set up custom domains and DNS
   - Configure SSL certificates (auto-renewal)
   - Set up CDN caching rules
   - Configure edge caching headers
   - Set up analytics tracking
3. Verify frontend deployment:
   - Check deployment status
   - Verify build logs for errors
   - Test health check endpoint
   - Verify application loads in browser
   - Test core user flows

### Step 6: Backend Deployment
1. Deploy backend application:
   - Build Docker image (if using Docker)
   - Push image to container registry
   - Deploy to platform:
     - **Docker**: Deploy container to host or orchestration platform
     - **Kubernetes**: Apply deployment, service, and ingress manifests
     - **AWS ECS/EKS**: Deploy to container service
     - **GCP Cloud Run**: Deploy to serverless platform
     - **Azure Container Apps**: Deploy to container apps
     - **Custom VM**: SSH to server, pull image, run container
2. Configure backend infrastructure:
   - Set up load balancers
   - Configure auto-scaling policies
   - Set up network security groups and firewalls
   - Configure health checks and load balancing
   - Set up monitoring and logging
3. Verify backend deployment:
   - Check pod/container status
   - Verify health check endpoint: `GET /health`
   - Check logs for startup errors
   - Test API endpoints
   - Verify database connectivity

### Step 7: Database Migration
1. Execute database migrations:
   - Run Alembic migrations: `alembic upgrade head`
   - Or apply migration scripts directly
   - Monitor migration progress and logs
   - Verify migration completed successfully
2. Validate database state:
   - Verify new tables/columns exist
   - Verify constraints are applied
   - Verify indexes are created
   - Verify data integrity
   - Sample queries to validate functionality
3. Backup database (pre-migration):
   - Create backup before migration
   - Store backup securely
   - Verify backup can be restored
4. Prepare rollback:
   - Have downgrade migration ready
   - Test rollback on staging
   - Document rollback procedure

### Step 8: Post-Deployment Verification
1. Verify application health:
   - Check health check endpoints (frontend and backend)
   - Verify all services are running
   - Check resource usage (CPU, memory, disk)
   - Verify logs show no errors
2. Verify functionality:
   - Test core user flows (login, create task, etc.)
   - Test API endpoints
   - Test database queries
   - Test authentication and authorization
   - Test multi-user data isolation
3. Verify performance:
   - Check response times
   - Check error rates
   - Check resource utilization
   - Compare to baseline (previous deployment)
4. Verify monitoring and observability:
   - Check metrics are being collected
   - Check logs are being sent to logging service
   - Check alerts are configured
   - Check dashboards are displaying data

### Step 9: Smoke Testing
1. Run smoke tests:
   - Test critical user paths
   - Test authentication flow (login, logout, token refresh)
   - Test CRUD operations (create, read, update, delete tasks)
   - Test error handling (invalid data, errors)
   - Test multi-user scenarios (user isolation)
2. Validate data consistency:
   - Verify data is correctly persisted
   - Verify user data is isolated
   - Verify relationships are correct
   - Verify constraints are enforced
3. Validate integrations:
   - Test database connectivity
   - Test external API integrations (if any)
   - Test authentication provider (Better Auth, OAuth)
   - Test email services (if sending notifications)

### Step 10: Rollback Preparation
1. Prepare rollback plan:
   - Identify previous stable version
   - Have rollback artifacts ready
   - Document rollback steps
   - Set rollback triggers and conditions
2. Monitor for rollback triggers:
   - Health check failures
   - High error rates
   - Performance degradation
   - Critical bugs discovered
   - Data corruption or inconsistency
3. Execute rollback if needed:
   - Stop current deployment
   - Rollback to previous version
   - Execute database rollback (migration downgrade)
   - Verify rollback succeeded
   - Document rollback incident

### Step 11: Deployment Documentation
1. Generate deployment report:
   - Version deployed
   - Deployment timestamp
   - Changes included
   - Environment deployed to
   - Health check results
   - Issues encountered and resolved
2. Update deployment logs:
   - Record deployment in deployment history
   - Link to commit/PR
   - Record rollback history (if any)
   - Document any manual interventions
3. Update documentation:
   - Update version numbers in documentation
   - Update feature flags configuration
   - Update API documentation (if endpoints changed)
   - Update deployment runbooks

### Step 12: Monitoring and Alerting Setup
1. Configure monitoring:
   - Set up application performance monitoring (APM)
   - Set up infrastructure monitoring (CPU, memory, disk, network)
   - Set up database monitoring (connections, queries, performance)
   - Set up API monitoring (response times, error rates)
2. Configure alerting:
   - Set up alerts for critical errors
   - Set up alerts for high error rates
   - Set up alerts for performance degradation
   - Set up alerts for resource exhaustion
   - Set up alerts for database issues
3. Configure observability:
   - Set up distributed tracing
   - Set up log aggregation and search
   - Set up dashboards for monitoring
   - Set up alert notification channels (email, Slack, PagerDuty)

## Outputs

### Primary Output: Deployment Report

```yaml
deployment_report:
  meta:
    deployment_id: string  # Unique deployment identifier
    version: string  # Application version
    commit_hash: string  # Git commit hash
    timestamp: datetime
    deployer: string  # User or system that triggered deployment
    environment: enum(development|staging|production)

  pre_deployment_validation:
    status: enum(passed|failed|blocked)
    checks:
      - name: string
        status: enum(passed|failed|skipped)
        details: string
    issues: [string]
    blockers: [string]

  build:
    frontend:
      status: enum(success|failed)
      build_time_seconds: int
      artifact_path: string
      build_logs_path: string
    backend:
      status: enum(success|failed)
      build_time_seconds: int
      artifact_path: string
      build_logs_path: string
    database:
      migrations_applied: int
      migration_status: enum(success|failed|pending)
      migration_logs_path: string

  deployment_strategy:
    strategy: enum(rolling|blue_green|canary|recreate)
    config: object
    rollback_strategy: string

  deployment:
    frontend:
      status: enum(success|failed|in_progress|rolled_back)
      platform: string  # e.g., vercel, netlify, kubernetes
      url: string
      health_check_url: string
      deployment_time_seconds: int
      instance_count: int

    backend:
      status: enum(success|failed|in_progress|rolled_back)
      platform: string  # e.g., kubernetes, docker, aws
      api_url: string
      health_check_url: string
      deployment_time_seconds: int
      instance_count: int

    database:
      status: enum(success|failed|in_progress|rolled_back)
      platform: string  # e.g., neon_postgresql
      migration_version: string
      backup_created: boolean
      backup_id: string

  environment:
    variables_configured: int
    secrets_loaded: int
    configuration_file: string

  post_deployment_verification:
    health_checks:
      frontend:
        status: enum(healthy|unhealthy|degraded)
        response_time_ms: int
        uptime_percentage: float
      backend:
        status: enum(healthy|unhealthy|degraded)
        response_time_ms: int
        uptime_percentage: float
      database:
        status: enum(healthy|unhealthy|degraded)
        connection_pool_active: int
        connection_pool_max: int

    smoke_tests:
      total: int
      passed: int
      failed: int
      tests:
        - name: string
          status: enum(passed|failed|skipped)
          duration_ms: int
          error_message: string

    functionality_tests:
      authentication:
        status: enum(passed|failed)
        details: string
      crud_operations:
        status: enum(passed|failed)
        details: string
      multi_user_isolation:
        status: enum(passed|failed)
        details: string

    performance_metrics:
      api_response_time_p50_ms: int
      api_response_time_p95_ms: int
      api_response_time_p99_ms: int
      error_rate_percent: float
      cpu_utilization_percent: float
      memory_utilization_percent: float

  rollback:
    executed: boolean
    reason: string  # If rollback was executed
    previous_version: string
    rollback_time_seconds: int
    rollback_status: enum(success|failed)

  issues_encountered:
    - issue_id: string
      severity: enum(critical|high|medium|low)
      category: enum(build|deployment|verification|rollback)
      description: string
      resolution: string
      resolved: boolean
      timestamp: datetime

  deployment_artifacts:
    frontend_artifact: string  # URL or path
    backend_artifact: string  # URL or path
    database_migration_version: string
    deployment_manifest: string

  monitoring_setup:
    monitoring_enabled: boolean
    alerting_enabled: boolean
    dashboards: [string]
    alert_rules_configured: int

  overall_status:
    status: enum(success|failed|partial_success|rolled_back)
    healthy: boolean
    ready_for_traffic: boolean

  recommendations:
    immediate:
      - string  # Actions needed immediately
    short_term:
      - string  # Actions needed in next few days
    long_term:
      - string  # Actions needed for future deployments
```

### Secondary Outputs

1. **Environment Configuration File**:
   - `.env.production` with all environment variables
   - `secrets.txt` with secret references (not actual secrets)

2. **Deployment Manifests**:
   - Docker Compose file (if using Docker)
   - Kubernetes manifests (if using Kubernetes)
   - Terraform configuration (if using Terraform)
   - CI/CD pipeline configuration

3. **Rollback Plan**:
   - Steps to rollback to previous version
   - Previous version artifacts location
   - Rollback triggers and conditions

4. **Monitoring Configuration**:
   - Prometheus/Grafana configuration
   - CloudWatch/DataDog configuration
   - Alert rules and thresholds

5. **Deployment Checklist**:
   - Pre-deployment checklist
   - Post-deployment verification checklist
   - Monitoring and alerting checklist

## Scope & Boundaries

### This Skill MUST:

- Prepare and configure applications for deployment (frontend and backend)
- Manage environment variables and secrets
- Execute build processes for frontend and backend
- Deploy applications to target platforms (Vercel, Kubernetes, Docker, etc.)
- Execute database migrations
- Configure infrastructure for deployment (load balancers, SSL, DNS)
- Perform post-deployment verification and smoke testing
- Monitor deployment health and performance
- Prepare rollback plans and execute rollbacks if needed
- Set up monitoring, alerting, and observability
- Generate deployment reports and documentation
- Ensure zero-downtime deployment where possible
- Validate Phase I features still work after deployment

### This Skill MUST NOT:

- Implement new features or functionality
- Write application code (frontend, backend, database)
- Implement authentication logic or JWT validation
- Define database schemas or create models
- Generate test code or test scripts
- Implement business logic for features
- Create UI components or pages
- Configure application features beyond deployment
- Fix application bugs or issues (only deployment-related)
- Modify feature specifications
- Design new infrastructure beyond deployment

### Boundary Examples

**In Scope:**
- Configure `NEXT_PUBLIC_API_URL=https://api.example.com` environment variable
- Deploy Next.js frontend to Vercel with `vercel deploy --prod`
- Deploy FastAPI backend to Kubernetes with `kubectl apply -f deployment.yaml`
- Execute Alembic migration: `alembic upgrade head`
- Set up SSL certificate for custom domain
- Configure health check endpoint: `GET /health`
- Set up auto-scaling policy for backend instances
- Create database backup before migration
- Verify deployment by checking health check endpoint
- Rollback to previous version if health checks fail
- Configure Datadog monitoring and alerting
- Generate deployment report with version and timestamp

**Out of Scope:**
- Implement TaskForm component in React
- Write FastAPI route: `@app.post("/api/todos")`
- Create SQLModel class: `class Todo(SQLModel, table=True): ...`
- Implement JWT validation middleware
- Fix bug: "Task not saving to database"
- Write unit test: `test_create_todo()`
- Implement business logic: "Completed tasks cannot be edited"
- Design new feature: Task sharing between users
- Create API documentation
- Fix UI styling issue: "Button color wrong"
- Implement new database migration

## Dependencies

### Required Dependencies

1. **Spec-Kit Plus Schema**
   - Location: `/specs/.spec-kit/schema.md`
   - Purpose: Defines specification file structure

2. **Project Configuration**
   - Location: `/specs/.spec-kit/config.md`
   - Purpose: Provides deployment platform and infrastructure details

### Specification Dependencies

1. **Deployment Specs**
   - Location: `/specs/deployment/*.md`
   - Purpose: Define deployment targets, environment configs, CI/CD pipelines

2. **Infrastructure Specs**
   - Location: `/specs/infrastructure/*.md`
   - Purpose: Define cloud resources, scaling, monitoring setup

3. **Database Specs**
   - Location: `/specs/database/*.md`
   - Purpose: Define migration scripts and schema changes

4. **Architecture Specs**
   - Location: `/specs/architecture/*.md`
   - Purpose: Define deployment strategies and infrastructure patterns

### Skill Dependencies

1. **All Implementation Skills**:
   - **Frontend UI Skill**: Understand frontend components and build requirements
   - **Frontend API Client Skill**: Understand API client dependencies
   - **API Construction Skill**: Understand backend API endpoints
   - **Task Business Logic Skill**: Understand business logic dependencies
   - **Authentication Skill**: Understand auth token and secret requirements
   - **Database Modeling Skill**: Understand database models and migration requirements
   - **Integration & Validation Skill**: Understand integration points and dependencies

2. **Spec Interpretation Skill**:
   - Parse and understand deployment and infrastructure specifications

### Optional Dependencies

1. **Phase I Deployment Specs**
   - Location: Phase I deployment specifications
   - Purpose: Ensure Phase I compatibility

2. **Security Specs**
   - Location: `/specs/security/*.md`
   - Purpose: Configure security settings (SSL, secrets, access controls)

3. **Performance Specs**
   - Location: `/specs/performance/*.md`
   - Purpose: Configure scaling and performance tuning

## Used By Agents

### Primary Consumers

1. **General-Purpose Agents**
   - When deploying features to production
   - When performing hotfix deployments
   - When rolling back failed deployments
   - When setting up new environments

2. **DevOps Agents**
   - When managing CI/CD pipelines
   - When configuring infrastructure for deployment
   - When setting up monitoring and alerting
   - When executing database migrations

3. **Deployment Agents**
   - When orchestrating deployment across all layers
   - When executing deployment scripts
   - When verifying deployment health
   - When generating deployment reports

4. **Plan Agents (Software Architect)**
   - When designing deployment strategies
   - When planning infrastructure provisioning
   - When designing CI/CD pipelines
   - When planning rollback procedures

### Secondary Consumers

1. **Quality Assurance Agents**
   - When verifying deployment before releasing to users
   - When performing smoke tests after deployment
   - When validating Phase I feature compatibility

2. **Monitoring Agents**
   - When setting up observability
   - When configuring alerting rules
   - When monitoring deployment health

3. **Documentation Agents**
   - When documenting deployment procedures
   - When creating deployment runbooks
   - When documenting rollback procedures

## Integration Notes

### Calling Convention

```yaml
skill: "deployment"
inputs:
  deployment_spec: "deployment/production.md"
  infrastructure_spec: "infrastructure/aws.md"
  database_spec: "database/migrations.md"
  feature_specs: [string]  # Features being deployed
  environment: enum(development|staging|production)
  deployment_strategy: enum(rolling|blue_green|canary|recreate)
  target_platform:
    frontend: enum(vercel|netlify|docker|kubernetes|aws_s3|custom)
    backend: enum(docker|kubernetes|aws_ecs|aws_eks|gcp_cloud_run|azure|custom)
  rollback_enabled: boolean
  phase_i_validation: boolean
  output_format: "deployment_report"
```

### Error Handling

- **Pre-Deployment Validation Failed**: Return validation errors, block deployment
- **Build Failed**: Return build logs and errors, abort deployment
- **Deployment Failed**: Attempt rollback if configured, return deployment report with errors
- **Migration Failed**: Attempt migration rollback, return migration logs and errors
- **Health Check Failed**: Attempt rollback if configured, alert team
- **Smoke Tests Failed**: Consider rollback depending on severity, return test results

### Deployment Environments

1. **Development**:
   - Quick deployments, minimal validation
   - Used for testing and debugging
   - No production-level monitoring
   - May have sample data

2. **Staging**:
   - Production-like environment
   - Full validation and testing
   - Production-level monitoring
   - Testing data (not real user data)
   - Pre-production testing environment

3. **Production**:
   - Full validation and testing required
   - Production-level monitoring and alerting
   - Zero-downtime deployment preferred
   - Real user data
   - Rollback plans required

### Deployment Strategies

1. **Rolling Deployment**:
   - Replace instances one by one
   - Zero downtime for stateless apps
   - Slower deployment but safer
   - Can rollback gradually

2. **Blue-Green Deployment**:
   - Deploy to new environment (green)
   - Switch traffic to green
   - Instant rollback (switch back to blue)
   - Requires double resources temporarily

3. **Canary Deployment**:
   - Deploy to small subset (1-5% of traffic)
   - Gradually increase traffic if healthy
   - Risk mitigation for major changes
   - Takes longer to complete

4. **Recreate Deployment**:
   - Stop all instances
   - Deploy new version
   - Start all instances
   - Simple but has downtime
   - Not recommended for production

### Platform-Specific Notes

**Vercel (Frontend)**:
- Automatic SSL certificates
- Zero configuration deployment
- Preview deployments for PRs
- Edge functions support
- Environment variables in dashboard or `.env` file

**Kubernetes (Backend)**:
- Declarative deployment with manifests
- Auto-scaling support
- Service discovery
- Health checks and readiness probes
- Rolling updates default

**Docker (Backend)**:
- Container packaging
- Orchestration required (Kubernetes, Docker Swarm)
- Easy to run locally
- Reproducible builds

**Neon PostgreSQL (Database)**:
- Serverless PostgreSQL
- Automatic scaling
- Branch for development/testing
- Backup and restore

### Monitoring and Observability

**Key Metrics to Monitor**:
- Frontend: Core Web Vitals (LCP, FID, CLS), error rates, uptime
- Backend: Response times, error rates, throughput, resource usage
- Database: Query performance, connection pool usage, replication lag

**Alerting Thresholds**:
- Error rate > 5% for 5 minutes (critical)
- Response time P95 > 1000ms for 5 minutes (high)
- CPU > 80% for 10 minutes (medium)
- Memory > 85% for 10 minutes (medium)
- Database connection pool > 90% for 5 minutes (high)

---

**Version:** 1.0.0
**Last Updated:** 2026-01-01
**Maintainer:** Spec-Kit Plus AI Agent System
