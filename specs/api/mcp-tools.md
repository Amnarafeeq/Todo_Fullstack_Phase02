# MCP Tools Specification

## Overview
Model Context Protocol (MCP) tools enable AI agents (like Claude) to interact with the Todo App backend. These tools will be implemented in future phases (Phase III+).

**Note: This specification is for planning purposes only. MCP tools are not required for Phase II.**

## Tool Definitions

### 1. create_task

**Description:** Create a new task in the user's task list.

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "description": "The task title (required, max 200 characters)"
    },
    "description": {
      "type": "string",
      "description": "The task description (optional, max 1000 characters)"
    },
    "priority": {
      "type": "string",
      "enum": ["high", "medium", "low"],
      "description": "Task priority level (default: medium)"
    },
    "category": {
      "type": "string",
      "description": "Task category (optional, max 50 characters)"
    }
  },
  "required": ["title"]
}
```

**Output Schema:**
```json
{
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "description": "The unique task ID"
    },
    "title": {
      "type": "string",
      "description": "The task title"
    },
    "description": {
      "type": "string",
      "description": "The task description"
    },
    "completed": {
      "type": "boolean",
      "description": "Whether the task is completed"
    },
    "priority": {
      "type": "string",
      "description": "Task priority"
    },
    "category": {
      "type": "string",
      "description": "Task category"
    },
    "created_at": {
      "type": "string",
      "format": "date-time",
      "description": "Creation timestamp"
    }
  }
}
```

**Example Usage:**
```javascript
{
  "tool": "create_task",
  "arguments": {
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "priority": "high",
    "category": "Personal"
  }
}
```

---

### 2. list_tasks

**Description:** List tasks with optional filtering and sorting.

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "status": {
      "type": "string",
      "enum": ["all", "pending", "completed"],
      "description": "Filter by completion status (default: all)"
    },
    "priority": {
      "type": "string",
      "enum": ["all", "high", "medium", "low"],
      "description": "Filter by priority (default: all)"
    },
    "category": {
      "type": "string",
      "description": "Filter by category name"
    },
    "search": {
      "type": "string",
      "description": "Search keyword in title and description"
    },
    "sort_by": {
      "type": "string",
      "enum": ["priority", "title", "created_at"],
      "description": "Sort field (default: created_at)"
    },
    "sort_order": {
      "type": "string",
      "enum": ["asc", "desc"],
      "description": "Sort direction (default: desc)"
    },
    "limit": {
      "type": "integer",
      "description": "Maximum number of tasks to return (default: 100)"
    }
  }
}
```

**Output Schema:**
```json
{
  "type": "object",
  "properties": {
    "tasks": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {"type": "integer"},
          "title": {"type": "string"},
          "description": {"type": "string"},
          "completed": {"type": "boolean"},
          "priority": {"type": "string"},
          "category": {"type": "string"},
          "created_at": {"type": "string", "format": "date-time"}
        }
      }
    },
    "count": {
      "type": "integer",
      "description": "Total number of tasks returned"
    }
  }
}
```

**Example Usage:**
```javascript
{
  "tool": "list_tasks",
  "arguments": {
    "status": "pending",
    "priority": "high",
    "sort_by": "priority",
    "sort_order": "desc"
  }
}
```

---

### 3. get_task

**Description:** Get details of a specific task by ID.

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "task_id": {
      "type": "integer",
      "description": "The unique task ID (required)"
    }
  },
  "required": ["task_id"]
}
```

**Output Schema:**
```json
{
  "type": "object",
  "properties": {
    "id": {"type": "integer"},
    "user_id": {"type": "integer"},
    "title": {"type": "string"},
    "description": {"type": "string"},
    "completed": {"type": "boolean"},
    "priority": {"type": "string"},
    "category": {"type": "string"},
    "created_at": {"type": "string", "format": "date-time"},
    "updated_at": {"type": "string", "format": "date-time"}
  }
}
```

**Example Usage:**
```javascript
{
  "tool": "get_task",
  "arguments": {
    "task_id": 123
  }
}
```

---

### 4. update_task

**Description:** Update an existing task (partial update supported).

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "task_id": {
      "type": "integer",
      "description": "The unique task ID (required)"
    },
    "title": {
      "type": "string",
      "description": "Updated task title (max 200 characters)"
    },
    "description": {
      "type": "string",
      "description": "Updated task description (max 1000 characters)"
    },
    "completed": {
      "type": "boolean",
      "description": "Updated completion status"
    },
    "priority": {
      "type": "string",
      "enum": ["high", "medium", "low"],
      "description": "Updated priority"
    },
    "category": {
      "type": "string",
      "description": "Updated category (max 50 characters)"
    }
  },
  "required": ["task_id"]
}
```

**Output Schema:**
```json
{
  "type": "object",
  "properties": {
    "id": {"type": "integer"},
    "title": {"type": "string"},
    "description": {"type": "string"},
    "completed": {"type": "boolean"},
    "priority": {"type": "string"},
    "category": {"type": "string"},
    "updated_at": {"type": "string", "format": "date-time"}
  }
}
```

**Example Usage:**
```javascript
{
  "tool": "update_task",
  "arguments": {
    "task_id": 123,
    "title": "Updated task title",
    "completed": true
  }
}
```

---

### 5. delete_task

**Description:** Delete a task by ID.

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "task_id": {
      "type": "integer",
      "description": "The unique task ID (required)"
    }
  },
  "required": ["task_id"]
}
```

**Output Schema:**
```json
{
  "type": "object",
  "properties": {
    "success": {
      "type": "boolean",
      "description": "Whether the deletion was successful"
    },
    "message": {
      "type": "string",
      "description": "Confirmation message"
    }
  }
}
```

**Example Usage:**
```javascript
{
  "tool": "delete_task",
  "arguments": {
    "task_id": 123
  }
}
```

---

### 6. toggle_complete

**Description:** Toggle the completion status of a task.

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "task_id": {
      "type": "integer",
      "description": "The unique task ID (required)"
    }
  },
  "required": ["task_id"]
}
```

**Output Schema:**
```json
{
  "type": "object",
  "properties": {
    "id": {"type": "integer"},
    "title": {"type": "string"},
    "completed": {"type": "boolean"},
    "updated_at": {"type": "string", "format": "date-time"}
  }
}
```

**Example Usage:**
```javascript
{
  "tool": "toggle_complete",
  "arguments": {
    "task_id": 123
  }
}
```

---

### 7. search_tasks

**Description:** Search tasks by keyword in title and description.

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "query": {
      "type": "string",
      "description": "Search keyword or phrase (required)"
    },
    "status": {
      "type": "string",
      "enum": ["all", "pending", "completed"],
      "description": "Filter by completion status (default: all)"
    },
    "limit": {
      "type": "integer",
      "description": "Maximum results to return (default: 50)"
    }
  },
  "required": ["query"]
}
```

**Output Schema:**
```json
{
  "type": "object",
  "properties": {
    "tasks": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": {"type": "integer"},
          "title": {"type": "string"},
          "description": {"type": "string"},
          "completed": {"type": "boolean"},
          "priority": {"type": "string"},
          "category": {"type": "string"}
        }
      }
    },
    "count": {
      "type": "integer",
      "description": "Number of matching tasks"
    },
    "query": {
      "type": "string",
      "description": "The search query used"
    }
  }
}
```

**Example Usage:**
```javascript
{
  "tool": "search_tasks",
  "arguments": {
    "query": "project documentation",
    "status": "pending"
  }
}
```

---

### 8. get_statistics

**Description:** Get task statistics for the user.

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "timeframe": {
      "type": "string",
      "enum": ["all", "today", "week", "month"],
      "description": "Time period for statistics (default: all)"
    }
  }
}
```

**Output Schema:**
```json
{
  "type": "object",
  "properties": {
    "total": {
      "type": "integer",
      "description": "Total number of tasks"
    },
    "completed": {
      "type": "integer",
      "description": "Number of completed tasks"
    },
    "pending": {
      "type": "integer",
      "description": "Number of pending tasks"
    },
    "by_priority": {
      "type": "object",
      "properties": {
        "high": {"type": "integer"},
        "medium": {"type": "integer"},
        "low": {"type": "integer"}
      },
      "description": "Task count by priority"
    },
    "by_category": {
      "type": "object",
      "description": "Task count by category"
    }
  }
}
```

**Example Usage:**
```javascript
{
  "tool": "get_statistics",
  "arguments": {
    "timeframe": "week"
  }
}
```

---

## Tool Implementation

### Backend Integration

Each MCP tool maps to existing REST API endpoints:

| MCP Tool | REST Endpoint | HTTP Method |
|----------|---------------|-------------|
| create_task | `/api/{user_id}/tasks` | POST |
| list_tasks | `/api/{user_id}/tasks` | GET |
| get_task | `/api/{user_id}/tasks/{id}` | GET |
| update_task | `/api/{user_id}/tasks/{id}` | PUT |
| delete_task | `/api/{user_id}/tasks/{id}` | DELETE |
| toggle_complete | `/api/{user_id}/tasks/{id}/complete` | PATCH |
| search_tasks | `/api/{user_id}/tasks?search=...` | GET |
| get_statistics | `/api/{user_id}/tasks/statistics` | GET (new) |

### MCP Server Configuration

**mcp-server.json:**
```json
{
  "name": "todo-app-mcp-server",
  "version": "1.0.0",
  "tools": [
    "create_task",
    "list_tasks",
    "get_task",
    "update_task",
    "delete_task",
    "toggle_complete",
    "search_tasks",
    "get_statistics"
  ],
  "authentication": {
    "type": "jwt",
    "secret": "BETTER_AUTH_SECRET"
  }
}
```

---

## Error Handling

All MCP tools return consistent error responses:

```json
{
  "success": false,
  "error": {
    "code": "string",
    "message": "string"
  }
}
```

### Common Error Codes

| Code | Description |
|------|-------------|
| INVALID_INPUT | Invalid request parameters |
| NOT_FOUND | Task not found |
| UNAUTHORIZED | Invalid or missing authentication |
| FORBIDDEN | User doesn't have permission |
| SERVER_ERROR | Internal server error |

---

## Future Enhancements

### Advanced Tools (Phase IV+)

- **bulk_create_tasks**: Create multiple tasks at once
- **bulk_update_tasks**: Update multiple tasks
- **bulk_delete_tasks**: Delete multiple tasks
- **archive_tasks**: Archive completed tasks
- **task_dependencies**: Create task dependencies
- **reminders**: Set task reminders
- **recurring_tasks**: Create recurring tasks

### AI Integration Features

- **natural_language_create**: Create tasks from natural language (e.g., "Add a high priority task to call John tomorrow")
- **smart_suggestions**: Suggest task priorities based on content
- **auto_categorize**: Automatically assign categories using NLP
- **task_recommendations**: Suggest related tasks

---

## Implementation Timeline

- **Phase II**: Not implemented (REST API only)
- **Phase III**: Basic MCP tools implementation
- **Phase IV**: Advanced MCP tools with AI integration

---

## Testing MCP Tools

### Using MCP Client

```python
from mcp_client import Client

client = Client(api_url="http://localhost:8000", token="your-jwt-token")

# Create a task
result = client.call_tool("create_task", {
    "title": "Test task",
    "priority": "high"
})

# List tasks
result = client.call_tool("list_tasks", {
    "status": "pending"
})
```

### Using Claude with MCP

When MCP is implemented, Claude can directly invoke these tools:

```
User: Create a high priority task for buying groceries
Claude: [Invokes create_task tool]
       Task created successfully!
```

---

## Security Considerations

- All MCP tools require valid JWT authentication
- User isolation enforced on all operations
- Input validation on all parameters
- Rate limiting (to be implemented)
- Audit logging (to be implemented)

---

## Documentation

- MCP Protocol Specification: https://modelcontextprotocol.io
- Tool Discovery: Tools will be automatically discoverable via `/mcp/tools` endpoint
- Tool Schemas: Available via `/mcp/schema/{tool_name}`
