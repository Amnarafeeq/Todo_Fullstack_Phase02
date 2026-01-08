# Backend Caching Skill

## Purpose

To cache frequent queries and improve performance for Todo application backend, integrating with Redis or in-memory cache. This skill serves as a reasoning layer for cache strategy design, cache invalidation, cache warming, and performance optimization across FastAPI backend.

## When to Use (Trigger Conditions)

This skill should be invoked when:

- Frequent database queries are identified
- API endpoint performance needs improvement
- Cache strategy needs to be designed or refactored
- Cache configuration needs to be updated (TTL, size limits)
- Cache invalidation rules need to be defined
- Cache warming is required for cold starts
- Cache metrics and performance monitoring is needed
- Cache size or memory usage is too high
- Multi-tenant or multi-user caching needs consideration
- Distributed caching is being implemented or optimized

**Triggers:**
- Database query profiling shows slow queries
- API response times are above threshold
- New feature adds frequently accessed data
- User reports performance issues
- Monitoring shows high database load
- Cache hit rate is too low
- Memory usage exceeds limits

## Inputs

### Required Inputs

1. **Query and Endpoint Data**
   - Query or endpoint to cache
   - Query parameters or request context
   - Execution frequency (queries per second/minute)
   - Average query execution time
   - Query complexity (joins, aggregations)

2. **Cache Configuration**
   - Cache type (Redis, in-memory, file-based)
   - TTL (time-to-live) configuration
   - Size limits (max number of items, max memory)
   - Eviction policy (LRU, LFU, FIFO)
   - Compression settings

3. **Data Context**
   - User ID and tenant ID (for multi-tenant caching)
   - Resource type (task, user, settings, etc.)
   - Query pattern or hash key

### Supported Cache Types

| Cache Type | Use Case | Purpose |
|-----------|---------|---------|
| Redis Cache | Frequent queries, shared state | Distributed cache, persistence, TTL |
| In-Memory Cache | Session data, hot data | Fast access, no persistence |
| CDN Cache | Static assets | Global distribution, edge caching |
| Database Query Cache | Complex queries | Cache query results |
| Response Cache | API responses | Cache entire response |
| Application Cache | Computed data | Cache expensive calculations |

## Actions

### Step 1: Caching Opportunity Analysis

1. Analyze query and endpoint performance:
   - Identify slow database queries (>100ms)
   - Identify frequently accessed endpoints
   - Identify queries with high execution count
   - Identify queries with expensive operations (joins, aggregations)

2. Categorize caching opportunities:
   - **High Frequency / Fast Queries**: Good candidates for caching
   - **Complex Queries**: Joins, aggregations, subqueries
   - **Expensive Calculations**: Data transformations, aggregations
   - **Read-Heavy Data**: Frequently read, rarely written data

3. Assess cache value:
   - Estimate query time reduction
   - Estimate database load reduction
   - Calculate cache hit rate improvement potential
   - Determine if caching is worth the complexity

### Step 2: Cache Key Design

1. Design cache key structure:
   - Include resource type: `task:{task_id}`
   - Include user context: `user:{user_id}:task_list`
   - Include tenant context: `tenant:{tenant_id}:tasks`
   - Include query parameters: `tasks:status={status}:priority={priority}:page={page}`
   - Include sorting: `tasks:sort={field}:{direction}`
   - Use consistent separator: `:` or `/`
   - Keep keys human-readable for debugging

2. Design cache key patterns:
   - Single resource: `resource:{resource_type}:{id}`
   - Collection: `user:{user_id}:tasks`
   - Query results: `query:{hash}:{params}`
   - Aggregate data: `stats:{date_range}:user:{user_id}`

3. Handle key collisions:
   - Use unique identifiers (UUID, IDs)
   - Add user/tenant context for multi-user isolation
   - Add version or timestamp for cache invalidation

### Step 3: Cache Strategy Selection

1. Choose cache type per use case:
   - **User-specific data**: Use Redis with user context in key
   - **Shared data**: Use Redis with global context
   - **Session data**: Use in-memory cache (fast access, session-scoped)
   - **API responses**: Use Redis or in-memory based on cache duration
   - **Database query results**: Use Redis or database query cache

2. Choose TTL (time-to-live) strategy:
   - **Short TTL (30-60 seconds)**: Frequently changing data, real-time data
   - **Medium TTL (5-15 minutes)**: Semi-static data, user profiles
   - **Long TTL (1-24 hours)**: Rarely changing data, aggregate stats
   - **No expiration**: Static configuration, reference data

3. Choose eviction policy:
   - **LRU (Least Recently Used)**: Good for time-based access patterns
   - **LFU (Least Frequently Used)**: Good for popularity-based access
   - **FIFO (First-In-First-Out)**: Simple, predictable
   - **TTL-based**: Evict when expired

### Step 4: Cache Implementation Design

1. Design cache layer architecture:
   - **Level 1 (L1)**: Database query cache (cache slow queries)
   - **Level 2 (L2)**: Application cache (cache computed results)
   - **Level 3 (L3)**: Session cache (user session data)
   - **Level 4 (L4)**: CDN cache (static assets)

2. Design cache-through strategy:
   - Check cache before database query
   - If cache hit, return cached data
   - If cache miss, query database and update cache
   - Don't return stale data without validation

3. Design cache-aside strategy:
   - Application reads from database
   - Application writes to cache and database
   - Next read may get cached data
   - Useful for write-heavy workloads

4. Design write-through strategy:
   - Application writes to cache and database synchronously
   - Next read gets cached data
   - Ensures cache is always in sync

5. Design write-back strategy:
   - Application writes to cache
   - Write to database happens asynchronously
   - Cache may be stale until database write completes

### Step 5: Cache Invalidation Strategy

1. Design invalidation triggers:
   - **Data changes**: Create, update, delete operations
   - **User actions**: Task completion, profile update
   - **Admin actions**: Bulk updates, manual cache clearing
   - **Time-based**: TTL expiration

2. Design invalidation scope:
   - **Specific**: Invalidate specific cache key (single resource)
   - **Collection**: Invalidate all items in collection (user's tasks)
   - **Pattern-based**: Invalidate keys matching pattern (all tasks for user)
   - **Global**: Clear entire cache (maintenance, config changes)

3. Design cache versioning:
   - Add version to cache keys or values
   - Compare versions to detect staleness
   - Use version for cache-aside or write-through

4. Design invalidation granularity:
   - **Fine-grained**: Invalidate specific items (better cache hit rate, more invalidations)
   - **Coarse-grained**: Invalidate entire collections (simpler, more cache misses)

5. Design invalidation cascades:
   - Update task → Invalidate task cache
   - Update task → Invalidate user's task list cache
   - Update user → Invalidate all user-related caches
   - Delete task → Invalidate task cache, task list cache

### Step 6: Cache Warming

1. Identify cache warming opportunities:
   - Application startup (cold start)
   - Scheduled tasks (daily/weekly)
   - Critical data access patterns
   - Predictive warming (based on user behavior)

2. Design cache warming strategy:
   - **On Startup**: Cache frequently accessed data (user profiles, settings)
   - **Scheduled**: Warm caches during low-traffic periods
   - **Predictive**: Pre-load data users are likely to access
   - **User-Specific**: Warm caches for active users

3. Design warming implementation:
   - Identify hot queries and data
   - Execute queries in background
   - Store results in cache
   - Track warming progress and completion

### Step 7: Cache Metrics and Monitoring

1. Track cache metrics:
   - Cache hit rate: `hits / (hits + misses)`
   - Cache miss rate: `misses / (hits + misses)`
   - Average response time with cache vs without cache
   - Cache size (memory usage)
   - Eviction rate

2. Set up performance monitoring:
   - Monitor cache performance (Redis operations per second)
   - Monitor cache size (memory usage, item count)
   - Monitor cache hit/miss rates
   - Alert on low hit rate (< 50%)
   - Alert on high memory usage (> 80%)
   - Alert on slow cache operations

3. Define cache health metrics:
   - Cache availability (Redis connection status)
   - Cache responsiveness (operation latency)
   - Cache error rate
   - Worker/pod health (if using Redis cluster)

### Step 8: Cache Configuration

1. Configure Redis settings:
   - Connection pool size
   - Timeout settings
   - Max memory limit
   - Eviction policy (maxmemory-policy)
   - Persistence (RDB/AOF)

2. Configure in-memory cache settings:
   - Max items in cache
   - TTL for all items
   - Eviction policy
   - Memory limit

3. Configure cache hierarchy:
   - L1 cache configuration (fast, small)
   - L2 cache configuration (slower, larger)
   - L3 cache configuration (slowest, largest)
   - Cache promotion/demotion policies

### Step 9: Multi-Tenant and Multi-User Caching

1. Isolate cache data per tenant:
   - Include tenant_id in all cache keys
   - Prevent cross-tenant data leakage
   - Validate tenant_id on cache access

2. Isolate cache data per user:
   - Include user_id in cache keys
   - Prevent cross-user data leakage
   - Validate user_id on cache access

3. Design cache partitioning:
   - Separate cache namespaces per tenant: `tenant:{tenant_id}:*`
   - Separate cache namespaces per user: `user:{user_id}:*`
   - Prevent cache key collisions

4. Handle tenant deletion:
   - Invalidate all tenant caches when tenant is deleted
   - Clear all cache keys with tenant_id prefix

5. Handle user deletion:
   - Invalidate all user caches when user is deleted
   - Clear all cache keys with user_id prefix

### Step 10: Distributed Caching (Redis Cluster)

1. Design cache distribution strategy:
   - Hash-based routing (consistent hashing)
   - Tag-based routing (client-side)
   - Proxy-based routing (single endpoint)

2. Handle cache consistency:
   - Use Redis Cluster for availability
   - Handle node failures gracefully
   - Use RedLock for distributed locking
   - Implement retry logic for failed operations

3. Design cache replication:
   - Primary-replica configuration (if applicable)
   - Read from replica, write to primary
   - Async replication for eventual consistency

## Outputs

### Primary Output: Caching Specification

```yaml
caching_specification:
  meta:
    feature_spec: string
    backend_spec: string
    generated_at: datetime
    version: string

  cache_targets:
    - endpoint: string  # API endpoint or database query
      cache_key_pattern: string  # Key pattern (e.g., "user:{user_id}:tasks")
      cache_type: enum(redis|in_memory|cdn|database_query_cache)
      query_frequency: string  # e.g., "100 req/min"
      avg_query_time_ms: int

    - database_query: string  # SQL query or ORM query
      cache_key_pattern: string
      complexity: enum(low|medium|high)
      execution_count: int

    - computed_data: string  # Computed result or aggregation
      cache_key_pattern: string
      computation_cost_ms: int  # Cost to compute
      update_frequency: string  # How often it changes

  cache_strategy:
    pattern: enum(cache_through|cache_aside|write_through|write_back)
    hierarchy_level: enum(l1|l2|l3|l4)
    cache_type: enum(redis|in_memory)

    ttl:
      duration_seconds: int
      max_duration_seconds: int
      sliding_window: boolean  # Sliding TTL for recent data

    eviction_policy:
      type: enum(lru|lfu|fifo|ttl)
      max_items: int
      max_memory_bytes: int
      priority_strategy: enum(access_time|access_count|custom)

    compression:
      enabled: boolean
      algorithm: enum(snappy|gzip|none)
      threshold_bytes: int

  cache_keys:
    resource:
      pattern: string  # e.g., "task:{task_id}"
      includes_user_id: boolean
      includes_tenant_id: boolean
      version_in_key: boolean

    collection:
      pattern: string  # e.g., "user:{user_id}:tasks"
      invalidate_on: [string]  # Actions that invalidate
      ttl: int  # Override default TTL

    query_result:
      pattern: string  # e.g., "query:{hash}:{params}"
      includes_user_id: boolean
      includes_tenant_id: boolean
      depends_on: [string]  # Data that triggers invalidation

    computed:
      pattern: string  # e.g., "stats:{date}:user:{user_id}"
      refresh_schedule: string  # When to refresh cache
      depends_on: [string]

  invalidation:
    - operation: enum(create|update|delete|bulk_update)
      invalidate_patterns: [string]
      scope: enum(specific|collection|pattern|global)
      cascades: [string]  # Follow-up invalidations

    triggers:
      - event: string  # Database event, API call
        table: string  # Database table
        action: enum(insert|update|delete)
        entity_id: string

      - time_based:
        - schedule: string  # Cron expression or interval
        ttl_check: boolean

    versioning:
      enabled: boolean
      version_field: string
      strategy: enum(invalidate_on_change|compare_versions)

  cache_warming:
    enabled: boolean

    - strategy:
        type: enum(on_startup|scheduled|predictive)
        trigger: string  # When to warm
        warmup_queries: [string]

    - on_startup:
      queries:
        - name: string
          key_pattern: string
          params: object
          expected_results: int

    - scheduled:
      schedule: string  # Cron expression
      queries: [object]  # List of queries to warm
      execution_window: string  # Time window to execute

    - predictive:
      - user_based: boolean
      behavior_pattern: string
      cache_keys: [string]

    monitoring:
      track_warming: boolean
      progress_threshold: float  # % complete to be successful

  metrics:
    - performance:
      hit_rate: float  # 0.0 to 1.0
      miss_rate: float
      avg_response_time_with_cache_ms: int
      avg_response_time_without_cache_ms: int
      cache_performance_ratio: float  # with_cache / without_cache

    - cache_size:
      items_count: int
      memory_used_bytes: int
      max_items: int
      max_memory_bytes: int

    - operations:
      get_operations_per_second: float
      set_operations_per_second: float
      delete_operations_per_second: float
      avg_operation_latency_ms: int

    - health:
      cache_status: enum(healthy|degraded|down)
      error_rate: float
      connection_pool_status: string
      memory_pressure: enum(low|medium|high|critical)

  alerts:
    - low_hit_rate:
      enabled: boolean
      threshold: float  # e.g., 0.5 for 50%
      action: enum(warn|alert|disable_caching)

    - high_memory_usage:
      enabled: boolean
      threshold: float  # e.g., 0.8 for 80%
      action: enum(warn|alert|evict_oldest)

    - slow_operations:
      enabled: boolean
      threshold_ms: int  # e.g., 10ms for Redis operations
      action: enum(warn|alert|investigate)

    - cache_unavailable:
      enabled: boolean
      action: enum(fallback_to_db|alert_admin|retry)

  multi_tenant:
    enabled: boolean
    key_prefix: string  # e.g., "tenant:{tenant_id}:"
    isolation: boolean  # Enforce tenant_id validation
    on_tenant_delete:
      action: enum(invalidate_all|delete_keys)

  multi_user:
    enabled: boolean
    key_prefix: string  # e.g., "user:{user_id}:"
    isolation: boolean  # Enforce user_id validation
    on_user_delete:
      action: enum(invalidate_all|delete_keys)

  configuration:
    redis:
      host: string
      port: int
      db_index: int
      password_env_var: string  # Environment variable name
      pool_size: int
      socket_timeout_ms: int
      socket_connect_timeout_ms: int
      max_connections: int
      retry_on_timeout: boolean

      persistence:
        enabled: boolean
        strategy: enum(rdb|aof|none)
        save_interval_seconds: int

      cluster:
        enabled: boolean
        slots: int  # Number of hash slots
        replicas: [string]  # List of replica addresses

    in_memory:
      max_items: int
      max_memory_mb: int
      cleanup_interval_seconds: int

      compression:
        enabled: boolean
        algorithm: enum(snappy|gzip|none)
        min_size_bytes: int

  implementation:
    cache_layer:
      - name: string  # e.g., "RedisCache", "InMemoryCache"
        methods: [string]  # get, set, delete, invalidate
        dependencies: [string]

    cache_interceptor:
      - name: string  # e.g., "CacheInterceptor"
        type: enum(middleware|dependency|decorator)
        endpoints: [string]  # Apply to these endpoints
        cache_key_generator: string  # Function name
        skip_condition: string  # When to skip cache

    background_warming:
      enabled: boolean
      implementation: string  # Celery task, etc.
      schedule: string
```

### Secondary Outputs

1. **Cache Key Generator**:
   ```python
   def generate_cache_key(resource_type: str, user_id: str, resource_id: str) -> str:
       return f"resource:{resource_type}:user:{user_id}:id:{resource_id}"
   ```

2. **Cache Decorator**:
   ```python
   from functools import wraps

   def cached(ttl_seconds: int = 300):
       def decorator(func):
           @wraps(func)
           async def wrapper(*args, **kwargs):
               # Check cache
               cache_key = generate_cache_key(...)
               cached_data = await cache.get(cache_key)
               if cached_data:
                   return cached_data
               # Execute function
               result = await func(*args, **kwargs)
               # Set cache
               await cache.set(cache_key, result, ttl=ttl_seconds)
               return result
           return wrapper
       return decorator
   ```

3. **Cache Service Interface**:
   ```python
   class CacheService:
       async def get(self, key: str) -> Any
       async def set(self, key: str, value: Any, ttl: int) -> None
       async def delete(self, key: str) -> None
       async def invalidate_pattern(self, pattern: str) -> None
       async def invalidate_all(self) -> None
       async def get_stats(self) -> CacheStats
   ```

## Scope & Boundaries

### This Skill MUST:

- Analyze query and endpoint performance
- Design cache strategies and hierarchies
- Design cache keys with proper scoping (user, tenant)
- Choose appropriate cache type (Redis, in-memory, etc.)
- Configure TTL and eviction policies
- Design invalidation strategies and triggers
- Implement cache warming for critical data
- Support multi-tenant and multi-user cache isolation
- Monitor cache metrics (hit rate, size, performance)
- Set up alerting for cache health issues

### This Skill MUST NOT:

- Implement actual cache infrastructure (Redis, etc.)
- Implement cache service code (only design interfaces)
- Create database queries or ORM operations
- Implement application features or business logic
- Write production cache code (only design strategy)
- Configure actual Redis instances or clusters
- Generate cache key generator code (only design pattern)
- Implement cache warming jobs or tasks (only design strategy)
- Modify database schemas or queries
- Write actual caching middleware or decorators

### Boundary Examples

**In Scope:**
- Analyze query: `SELECT * FROM todos WHERE user_id = ?` takes 500ms, 100 req/min → Design cache
- Design cache key: `user:{user_id}:tasks:page:{page}:limit:{limit}`
- Choose TTL: 5 minutes for task list cache
- Design invalidation: Update task → Invalidate `user:{user_id}:tasks` and `task:{task_id}`
- Design cache warming: On startup, cache top 100 users' task lists
- Configure alert: Alert if cache hit rate < 50% for 5 minutes
- Design multi-tenant: Include tenant_id in all cache keys
- Design metrics: Track hit rate, miss rate, response time

**Out of Scope:**
- Implement Redis connection: `redis.Redis(host='localhost', port=6379)`
- Implement cache decorator: `@cached(ttl_seconds=300)`
- Implement cache service: `class RedisCacheService: ...`
- Write database query: `session.query(Task).filter_by(user_id=user_id).all()`
- Implement actual cache warming task
- Configure Redis cluster settings
- Generate Python/TypeScript code for cache operations
- Create cache monitoring dashboard
- Modify database queries to add caching
- Write actual Redis commands: `SET key value EX 300`

## Dependencies

### Required Dependencies

1. **Spec-Kit Plus Schema**
   - Location: `/specs/.spec-kit/schema.md`
   - Purpose: Defines specification file structure

2. **Project Configuration**
   - Location: `/specs/.spec-kit/config.md`
   - Purpose: Provides cache infrastructure details

### Specification Dependencies

1. **Performance Specs**
   - Location: `/specs/performance/*.md`
   - Purpose: Define performance targets and thresholds

2. **Architecture Specs**
   - Location: `/specs/architecture/*.md`
   - Purpose: Define caching architecture and patterns

### Skill Dependencies

1. **Database Modeling Skill**
   - Purpose: Understand database models and queries
   - Used to design cache keys for data

2. **API Construction Skill**
   - Purpose: Understand API endpoints and query patterns
   - Used to design cache for API responses

3. **Spec Interpretation Skill**
   - Purpose: Parse and understand performance and architecture specifications
   - Used to extract caching requirements

### Optional Dependencies

1. **Task Business Logic Skill**
   - Purpose: Understand data access patterns
   - Used to design cache for frequently accessed data

2. **Notifications / Reminders Skill**
   - Purpose: Understand cache warming needs for reminders
   - Used to design warming for upcoming tasks

## Used By Agents

### Primary Consumers

1. **General-Purpose Agents**
   - When analyzing performance bottlenecks
   - When designing caching strategies
   - When configuring cache invalidation
   - When setting up cache monitoring

2. **Backend Implementation Agents**
   - When implementing cache layers
   - When implementing cache services
   - When implementing cache decorators
   - When implementing cache warming

3. **Infrastructure Agents**
   - When configuring Redis or other cache infrastructure
   - When setting up monitoring and alerting
   - When scaling cache infrastructure

4. **Plan Agents (Software Architect)**
   - When designing cache architecture
   - When planning cache strategies
   - When planning multi-tenant caching
   - When planning cache hierarchies

### Secondary Consumers

1. **Performance Agents**
   - When monitoring cache metrics
   - When analyzing cache effectiveness
   - When optimizing cache performance

2. **DevOps Agents**
   - When deploying cache infrastructure
   - When configuring Redis clusters
   - When scaling cache workers

3. **Testing Agents**
   - When testing cache hit/miss rates
   - When testing cache invalidation
   - When testing cache warming

## Integration Notes

### Calling Convention

```yaml
skill: "backend-caching"
inputs:
  backend_spec: string  # From API Construction Skill
  performance_spec: "specs/performance/cache-targets.md"
  cache_targets:
    - endpoint: string
      avg_query_time_ms: int
      query_frequency: string
    - database_query: string
      complexity: string
    - computed_data: string
      computation_cost_ms: int

  cache_strategy:
    pattern: enum(cache_through|cache_aside|write_through|write_back)
    ttl_duration_seconds: int
    max_items: int
    eviction_policy: enum(lru|lfu|fifo|ttl)
    compression_enabled: boolean

  multi_tenant:
    enabled: boolean
    on_tenant_delete: enum(invalidate_all|delete_keys)

  output_format: "caching_specification"
```

### Error Handling

- **No Cache Config**: Use default settings (no caching)
- **Cache Unavailable**: Fallback to database directly
- **High Memory Usage**: Alert and consider eviction
- **Low Hit Rate**: Investigate caching strategy, may disable cache
- **Cache Warming Failed**: Log error, continue without warmed cache

### Caching Best Practices

- Cache data that's read-heavy, write-light
- Use appropriate TTL (short for changing data, long for static)
- Invalidate cache on data changes (create, update, delete)
- Use cache keys that include context (user_id, tenant_id)
- Monitor cache hit rate and optimize accordingly
- Don't cache sensitive data (user passwords, tokens)
- Consider cache invalidation complexity (fine-grained vs coarse-grained)
- Use cache warming for critical or frequently accessed data

### Redis Best Practices

- Use connection pooling for better performance
- Use pipelining for multiple operations
- Use appropriate data types (Hash, Set, Sorted Set, etc.)
- Configure maxmemory-policy to prevent out-of-memory
- Use Redis Cluster for high availability
- Monitor Redis performance and health

### Cache Hierarchy

**L1 Cache (Fastest, Smallest):**
- User session data
- Authentication token cache
- Hot task data

**L2 Cache (Fast, Medium):**
- User's task list
- Frequently accessed tasks
- User profile

**L3 Cache (Slower, Larger):**
- All tasks (paginated)
- Task search results
- Aggregate statistics

**L4 Cache (Slowest, Largest):**
- User activity logs
- Historical data
- Large datasets

### Multi-Tenant Cache Keys

- Isolate by tenant: `tenant:{tenant_id}:*`
- Include tenant in all cache keys
- Validate tenant on cache access
- Invalidate all tenant caches on tenant deletion

- Examples:
  - `tenant:abc123:tasks:page:1` - Tenant ABC123's tasks, page 1
  - `tenant:abc123:user:def456:profile` - Tenant ABC123, user def456's profile
  - `tenant:abc123:stats:daily:2024-01-01` - Tenant ABC123's daily stats

---

**Version:** 1.0.0
**Last Updated:** 2026-01-01
**Maintainer:** Spec-Kit Plus AI Agent System
