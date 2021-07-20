define({ "api": [
  {
    "type": "get",
    "url": "/admins",
    "title": "Get Admins Profile",
    "version": "1.0.0",
    "name": "GetAdmins",
    "group": "Admin",
    "description": "<p>Get Admins Profile</p>",
    "filename": "routes/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "put",
    "url": "/admins/:id",
    "title": "Update Admin Profile",
    "version": "1.0.0",
    "name": "UpdateAdmin",
    "group": "Admin",
    "description": "<p>Update Admin Profile</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Admin ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "username",
            "description": "<p>Username</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n\n\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/admin.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/categories",
    "title": "Create Category",
    "name": "CreateCategory",
    "group": "Category",
    "description": "<p>Create Category</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Category Name</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n  \"name\":\"Job\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/category.js",
    "groupTitle": "Category"
  },
  {
    "type": "get",
    "url": "/categories/:id",
    "title": "Fetch One Category",
    "name": "FetchOneCategory",
    "group": "Category",
    "description": "<p>Get Catgeory</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>catgeoryID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/category.js",
    "groupTitle": "Category"
  },
  {
    "type": "get",
    "url": "/categories",
    "title": "Get Categeories",
    "name": "GetCategories",
    "group": "Category",
    "description": "<p>Fetch All Categories</p>",
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": "[\n    {\n        \"_id\": \"59fb0856b833462470fe234d\",\n        \"name\": \"Bids\",\n        \"updated_at\": null,\n        \"created_at\": \"2017-11-06T11:19:24.914Z\",\n        \"archived_at\": null,\n        \"archived\": false\n    },\n    {\n        \"_id\": \"59fb099eb833462470fe234e\",\n        \"name\": \"News\",\n        \"updated_at\": null,\n        \"created_at\": \"2017-11-06T11:19:24.914Z\",\n        \"archived_at\": null,\n        \"archived\": false\n    },\n    {\n        \"_id\": \"59fb09afb833462470fe234f\",\n        \"name\": \"Jobs\",\n        \"updated_at\": null,\n        \"created_at\": \"2017-11-06T11:19:24.914Z\",\n        \"archived_at\": null,\n        \"archived\": false\n    },\n    {\n        \"_id\": \"59fc45e630e958ac2c1e23f6\",\n        \"name\": \"Announcement\",\n        \"updated_at\": null,\n        \"created_at\": \"2017-11-06T11:19:24.914Z\",\n        \"archived_at\": null,\n        \"archived\": false\n    },\n    {\n        \"_id\": \"59fd40920deff5be1014fc5c\",\n        \"name\": \"Category2\",\n        \"updated_at\": null,\n        \"created_at\": \"2017-11-06T11:19:24.914Z\",\n        \"archived_at\": null,\n        \"archived\": false\n    }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/category.js",
    "groupTitle": "Category"
  },
  {
    "type": "put",
    "url": "/categories/:id",
    "title": "Update Categeory",
    "name": "UpdateCategory",
    "group": "Category",
    "description": "<p>Update Category</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>catgeoryID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/category.js",
    "groupTitle": "Category"
  },
  {
    "type": "put",
    "url": "/clients/language",
    "title": "Chnage Language",
    "version": "1.0.0",
    "name": "ChangeLanaguage",
    "group": "Client",
    "description": "<p>Change Language</p>",
    "parameter": {
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n\n\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/client.js",
    "groupTitle": "Client"
  },
  {
    "type": "put",
    "url": "/clients/:id/follow",
    "title": "Follow Client",
    "version": "1.0.0",
    "name": "FollowClient",
    "group": "Client",
    "description": "<p>Follow Client</p>",
    "parameter": {
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n\n\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/client.js",
    "groupTitle": "Client"
  },
  {
    "type": "get",
    "url": "/clients",
    "title": "Get Clients Profile",
    "version": "1.0.0",
    "name": "GetClients",
    "group": "Client",
    "description": "<p>Get Client Profile</p>",
    "filename": "routes/client.js",
    "groupTitle": "Client"
  },
  {
    "type": "put",
    "url": "/clients/following",
    "title": "Get Following",
    "version": "1.0.0",
    "name": "GetFollowing",
    "group": "Client",
    "description": "<p>Get Following</p>",
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n    \"following\": [\n        {\n            \"_id\": \"5a0ecc37fb83bc5f12ffb312\",\n            \"first_name\": \"Natan\",\n            \"last_name\": \"Tadesse\",\n            \"created_at\": \"2017-11-17T11:47:03.424Z\",\n            \"user\": \"5a0ecc37fb83bc5f12ffb311\",\n            \"client_follower\": [],\n            \"org_follower\": [],\n            \"following_client\": [],\n            \"following_org\": [],\n            \"gender\": \"Male\",\n            \"country\": \"Ethiopia\",\n            \"city\": \"Addis Ababa\",\n            \"mobile\": \"251 913 02 23 62\",\n            \"linkedin_link\": \"https://www.linkedin/my_linkedin_account\",\n            \"date_of_birth\": \"2017-12-09T21:00:00.000Z\",\n            \"picture\": \"uploads/600x600.jpg\",\n            \"language\": \"am-ET\",\n            \"tel\": \"\",\n            \"updated_at\": null,\n            \"archived_at\": null,\n            \"archived\": false,\n            \"follower\": [\n                \"5a226449c1c03d4655842c06\"\n            ],\n            \"following\": [],\n            \"title\": \"Mr.\"\n        },\n         {\n            \"_id\": \"5a0ecc37fb83bc5f12ffb312\",\n            \"first_name\": \"Natan\",\n            \"last_name\": \"Tadesse\",\n            \"created_at\": \"2017-11-17T11:47:03.424Z\",\n            \"user\": \"5a0ecc37fb83bc5f12ffb311\",\n            \"client_follower\": [],\n            \"org_follower\": [],\n            \"following_client\": [],\n            \"following_org\": [],\n            \"gender\": \"Male\",\n            \"country\": \"Ethiopia\",\n            \"city\": \"Addis Ababa\",\n            \"mobile\": \"251 913 02 23 62\",\n            \"linkedin_link\": \"https://www.linkedin/my_linkedin_account\",\n            \"date_of_birth\": \"2017-12-09T21:00:00.000Z\",\n            \"picture\": \"uploads/600x600.jpg\",\n            \"language\": \"am-ET\",\n            \"tel\": \"\",\n            \"updated_at\": null,\n            \"archived_at\": null,\n            \"archived\": false,\n            \"follower\": [\n                \"5a226449c1c03d4655842c06\"\n            ],\n            \"following\": [],\n            \"title\": \"Mr.\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/client.js",
    "groupTitle": "Client"
  },
  {
    "type": "delete",
    "url": "/clients/profilePic",
    "title": "Remove Profile Picture",
    "version": "1.0.0",
    "name": "RemoveProfielPicture",
    "group": "Client",
    "description": "<p>Remove Profile Picture</p>",
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": "     HTTP/1.1 200 OK\n {\n  \n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/client.js",
    "groupTitle": "Client"
  },
  {
    "type": "delete",
    "url": "/clients/:id/unfollow",
    "title": "UnFollow Client",
    "version": "1.0.0",
    "name": "UnFollowClient",
    "group": "Client",
    "description": "<p>UnFollow Client</p>",
    "parameter": {
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n\n\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/client.js",
    "groupTitle": "Client"
  },
  {
    "type": "delete",
    "url": "/clients/:id",
    "title": "Update Client Profile",
    "version": "1.0.0",
    "name": "UpdateClient",
    "group": "Client",
    "description": "<p>Update Client Profile</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>client ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Data to Update</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n\n\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/comment.js",
    "groupTitle": "Client"
  },
  {
    "type": "put",
    "url": "/clients/:id",
    "title": "Update Client Profile",
    "version": "1.0.0",
    "name": "UpdateClient",
    "group": "Client",
    "description": "<p>Update Client Profile</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>client ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Data to Update</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n\n\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/client.js",
    "groupTitle": "Client"
  },
  {
    "type": "put",
    "url": "/clients/profilePic",
    "title": "Uplaod Profile Picture",
    "version": "1.0.0",
    "name": "UploadProfilePicture",
    "group": "Client",
    "description": "<p>Upload Profile Picture</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "file",
            "description": "<p>Client Image</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": "     HTTP/1.1 200 OK\n {\n    \"error\": false,\n    \"upload\": \"Success\",\n    \"status\": 200\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/client.js",
    "groupTitle": "Client"
  },
  {
    "type": "get",
    "url": "/comments",
    "title": "Get Comments",
    "version": "1.0.0",
    "name": "GetComments",
    "group": "Comment",
    "description": "<p>Get Comments</p>",
    "filename": "routes/comment.js",
    "groupTitle": "Comment"
  },
  {
    "type": "get",
    "url": "/organizations",
    "title": "Get organizations Profile",
    "version": "1.0.0",
    "name": "Getorganizations",
    "group": "Organization",
    "description": "<p>Get organization Profile</p>",
    "filename": "routes/organization.js",
    "groupTitle": "Organization"
  },
  {
    "type": "get",
    "url": "/organizations//sectors/:sectorId",
    "title": "Get Sector Organizations",
    "version": "1.0.0",
    "name": "Getorganizations",
    "group": "Organization",
    "description": "<p>Get organization Profile</p>",
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": "[\n    {\n        \"_id\": \"5a03103446ed488961695664\",\n        \"org_name\": \"eic\",\n        \"sector\": \"59fd4a7edb4d87395059f5cb\",\n        \"created_at\": \"2017-11-08T14:09:56.285Z\",\n        \"user\": {\n            \"_id\": \"5a03103446ed488961695663\",\n            \"username\": \"eic@test.com\",\n            \"role\": \"organization\",\n            \"realm\": \"client\",\n            \"organization\": \"5a03103446ed488961695664\",\n            \"last_login\": \"2017-11-08T14:12:55.349Z\",\n            \"archived_at\": null,\n            \"archived\": false,\n            \"status\": \"active\"\n        },\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"client_following\": [],\n        \"org_folowing\": [],\n        \"client_follower\": [],\n        \"org_folower\": []\n    }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "routes/organization.js",
    "groupTitle": "Organization"
  },
  {
    "type": "put",
    "url": "/organizations/:id",
    "title": "Update organization Profile",
    "version": "1.0.0",
    "name": "Updateorganization",
    "group": "Organization",
    "description": "<p>Update organization Profile</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>organization ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>Data to Update</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n\n\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/organization.js",
    "groupTitle": "Organization"
  },
  {
    "type": "post",
    "url": "/posts/:id/comments",
    "title": "Comment Post",
    "name": "CommentPost",
    "group": "Post",
    "description": "<p>Comment Post</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>postId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment",
            "description": "<p>Comment</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n\"comment\":\"sdsldksjdjsldjsld\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n    \"_id\": \"5a02eea1c2476110718224d6\",\n    \"content\": \"What is Lorem Ipsum?Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum\",\n    \"category\": {\n        \"_id\": \"59fb0856b833462470fe234d\",\n        \"name\": \"Bids\"\n    },\n    \"created_at\": \"2017-11-08T11:46:41.875Z\",\n    \"created_by\": \"59fc4ad6596bcb4c4a133cfb\",\n    \"updated_at\": \"2017-11-08T11:49:46.526Z\",\n    \"archived_at\": null,\n    \"archived\": false,\n    \"status\": \"active\",\n    \"comments\": [\n        {\n            \"_id\": \"5a02ef5ab07baa3c75d6c4e4\",\n            \"comment\": \"What is Lorem Ipsum?Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum\",\n            \"created_at\": \"2017-11-08T11:49:46.526Z\",\n            \"created_by\": \"59fc4ad6596bcb4c4a133cfb\",\n            \"post\": \"5a02eea1c2476110718224d6\",\n            \"updated_at\": null,\n            \"archived_at\": null,\n            \"archived\": false\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/post.js",
    "groupTitle": "Post"
  },
  {
    "type": "post",
    "url": "/posts",
    "title": "Create Post",
    "name": "CreatePost",
    "group": "Post",
    "description": "<p>Create Sector</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>Content/Post</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>Category ID</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sector",
            "description": "<p>Sector ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": " {\n \"content\":\"yyyyyyyyyyyyyyyyyyyyy\",\n\t\"category\":\"59fb0856b833462470fe234d\"\n\t\"sector\":\"59fb0856b833462470fe234d\"\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n    \"_id\": \"5a0064124c5e7c061640a931\",\n    \"content\": \"yyyyyyyyyyyyyyyyyyyyy\",\n    \"category\": \"59fb0856b833462470fe234d\",\n    \"created_at\": \"2017-11-06T13:30:58.141Z\",\n    \"created_by\": \"5a00604b9c68619e0115acb4\",\n    \"organization\": {\n        \"_id\": \"5a00604b9c68619e0115acb5\",\n        \"org_name\": \"GoldG\",\n        \"sector\": \"59faf11b0aee4d9211b906b6\",\n        \"created_at\": \"2017-11-06T13:14:51.847Z\",\n        \"user\": \"5a00604b9c68619e0115acb4\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"folower\": []\n    },\n    \"updated_at\": null,\n    \"archived_at\": null,\n    \"archived\": false,\n    \"comment\": []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/post.js",
    "groupTitle": "Post"
  },
  {
    "type": "delete",
    "url": "/posts/:id",
    "title": "DeletePost",
    "name": "DeletePost",
    "group": "Post",
    "description": "<p>Delete Post</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>postId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n     \"_id\": \"5a00653f8bf841181c354173\",\n     \"content\": \"What is Lorem Ipsum?Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum\",\n     \"category\": {\n         \"_id\": \"59fb0856b833462470fe234d\",\n         \"name\": \"Bids\"\n     },\n     \"created_at\": \"2017-11-06T13:35:59.476Z\",\n     \"created_by\": \"5a00604b9c68619e0115acb4\",\n     \"organization\": {\n         \"_id\": \"5a00604b9c68619e0115acb5\",\n         \"org_name\": \"GoldG\",\n         \"sector\": \"59faf11b0aee4d9211b906b6\",\n         \"created_at\": \"2017-11-06T13:14:51.847Z\",\n         \"user\": \"5a00604b9c68619e0115acb4\",\n         \"updated_at\": null,\n         \"archived_at\": null,\n         \"archived\": false,\n         \"folower\": []\n     },\n     \"updated_at\": null,\n     \"archived_at\": null,\n     \"archived\": false,\n     \"comments\": []\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/post.js",
    "groupTitle": "Post"
  },
  {
    "type": "get",
    "url": "/posts/:id",
    "title": "Fetch One Post",
    "name": "FetchOnePost",
    "group": "Post",
    "description": "<p>Get One Post</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>postId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n    \"_id\": \"5a00653f8bf841181c354173\",\n    \"content\": \"What is Lorem Ipsum?Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum\",\n    \"category\": {\n        \"_id\": \"59fb0856b833462470fe234d\",\n        \"name\": \"Bids\"\n    },\n    \"created_at\": \"2017-11-06T13:35:59.476Z\",\n    \"created_by\": \"5a00604b9c68619e0115acb4\",\n    \"organization\": {\n        \"_id\": \"5a00604b9c68619e0115acb5\",\n        \"org_name\": \"GoldG\",\n        \"sector\": \"59faf11b0aee4d9211b906b6\",\n        \"created_at\": \"2017-11-06T13:14:51.847Z\",\n        \"user\": \"5a00604b9c68619e0115acb4\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"folower\": []\n    },\n    \"updated_at\": null,\n    \"archived_at\": null,\n    \"archived\": false,\n    \"comments\": []\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/post.js",
    "groupTitle": "Post"
  },
  {
    "type": "get",
    "url": "/posts/search?category=<parameter>&sector=<parameter>",
    "title": "Search Posts",
    "name": "GetOrganizarionPosts",
    "group": "Post",
    "description": "<p>Fetch All Organization/User Posts</p>",
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": "    [\n    {\n        \"_id\": \"5a0aeff776c353022c8d506d\",\n        \"content\": \"skdjksdjskdjskds\",\n        \"category\": {\n            \"_id\": \"5a0597acce72bc310b7d6010\",\n            \"name\": \"Jobs\"\n        },\n        \"sector\": {\n            \"_id\": \"5a059980ce72bc310b7d6019\",\n            \"name\": \"Educational\"\n        },\n        \"created_at\": \"2017-11-14T13:30:31.437Z\",\n        \"created_by\": {\n            \"_id\": \"5a06a8adadf94caa3340875b\",\n            \"username\": \"1wgida@gmail.com\",\n            \"role\": \"client\",\n            \"realm\": \"client\",\n            \"client\": \"5a06a8adadf94caa3340875c\",\n            \"last_login\": \"2017-11-14T11:54:20.611Z\",\n            \"status\": \"active\"\n        },\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"status\": \"active\",\n        \"comments\": []\n    }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/post.js",
    "groupTitle": "Post"
  },
  {
    "type": "get",
    "url": "/posts/myposts",
    "title": "Get Organizarion Posts",
    "name": "GetOrganizarionPosts",
    "group": "Post",
    "description": "<p>Fetch All Organization/User Posts</p>",
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": " [\n    {\n        \"_id\": \"5a00653f8bf841181c354173\",\n        \"content\": \"What is Lorem Ipsum?Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum\",\n        \"category\": {\n            \"_id\": \"59fb0856b833462470fe234d\",\n            \"name\": \"Bids\"\n        },\n        \"created_at\": \"2017-11-06T13:35:59.476Z\",\n        \"created_by\": \"5a00604b9c68619e0115acb4\",\n        \"organization\": {\n            \"_id\": \"5a00604b9c68619e0115acb5\",\n            \"org_name\": \"GoldG\",\n            \"sector\": \"59faf11b0aee4d9211b906b6\",\n            \"created_at\": \"2017-11-06T13:14:51.847Z\",\n            \"user\": \"5a00604b9c68619e0115acb4\",\n            \"updated_at\": null,\n            \"archived_at\": null,\n            \"archived\": false,\n            \"folower\": []\n        },\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"comments\": []\n    }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/post.js",
    "groupTitle": "Post"
  },
  {
    "type": "get",
    "url": "/posts/:id/comments",
    "title": "GET Post Comment",
    "name": "GetPostComment",
    "group": "Post",
    "description": "<p>Get Post Comment</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "post",
            "description": "<p>Post ID</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": " {\n    \"total_pages\": 1,\n    \"total_docs_count\": 2,\n    \"current_page\": 1,\n    \"docs\": [\n        {\n            \"_id\": \"5a1d5d37acebdb1614a89400\",\n            \"comment\": \"where?\",\n            \"created_at\": \"2017-11-28T12:57:27.069Z\",\n            \"created_by\": {\n                \"_id\": \"5a1948f5fcb148cf5d89889f\",\n                \"username\": \"haftug0951@gmail.com\",\n                \"role\": \"client\",\n                \"realm\": \"client\",\n                \"client\": {\n                    \"_id\": \"5a1948f5fcb148cf5d8988a0\",\n                    \"first_name\": \"haftu\",\n                    \"last_name\": \"gidey\",\n                    \"created_at\": \"2017-11-25T10:41:57.654Z\",\n                    \"user\": \"5a1948f5fcb148cf5d89889f\",\n                    \"tel\": \"\",\n                    \"language\": \"en-US\",\n                    \"country\": \"Ethiopia\",\n                    \"city\": \"A.A\",\n                    \"mobile\": \"0919046229\",\n                    \"linkedin_link\": \"facebook\",\n                    \"picture\": \"uploads/18891435_1310189105768460_4513037285993625508_o.jpg\",\n                    \"gender\": \"Male\",\n                    \"date_of_birth\": \"1985-03-06T00:00:00.000Z\",\n                    \"updated_at\": null,\n                    \"archived_at\": null,\n                    \"title\": \"Mr.\"\n                },\n                \"last_login\": \"2017-12-08T07:47:26.391Z\",\n                \"status\": \"active\"\n            },\n            \"post\": \"5a1d2cb15039d71b14651d7a\",\n            \"updated_at\": null,\n            \"archived_at\": null,\n            \"archived\": false\n        },\n        {\n            \"_id\": \"5a1d5d45fcc73d5014ee2c53\",\n            \"comment\": \"harmony hotel\",\n            \"created_at\": \"2017-11-28T12:57:41.318Z\",\n            \"created_by\": {\n                \"_id\": \"5a1948f5fcb148cf5d89889f\",\n                \"username\": \"haftug0951@gmail.com\",\n                \"role\": \"client\",\n                \"realm\": \"client\",\n                \"client\": {\n                    \"_id\": \"5a1948f5fcb148cf5d8988a0\",\n                    \"first_name\": \"haftu\",\n                    \"last_name\": \"gidey\",\n                    \"created_at\": \"2017-11-25T10:41:57.654Z\",\n                    \"user\": \"5a1948f5fcb148cf5d89889f\",\n                    \"tel\": \"\",\n                    \"language\": \"en-US\",\n                    \"country\": \"Ethiopia\",\n                    \"city\": \"A.A\",\n                    \"mobile\": \"0919046229\",\n                    \"linkedin_link\": \"facebook\",\n                    \"picture\": \"uploads/18891435_1310189105768460_4513037285993625508_o.jpg\",\n                    \"gender\": \"Male\",\n                    \"date_of_birth\": \"1985-03-06T00:00:00.000Z\",\n                    \"updated_at\": null,\n                    \"archived_at\": null,\n                    \"title\": \"Mr.\"\n                },\n                \"last_login\": \"2017-12-08T07:47:26.391Z\",\n                \"status\": \"active\"\n            },\n            \"post\": \"5a1d2cb15039d71b14651d7a\",\n            \"updated_at\": null,\n            \"archived_at\": null,\n            \"archived\": false\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/post.js",
    "groupTitle": "Post"
  },
  {
    "type": "get",
    "url": "/posts",
    "title": "Get Posts",
    "name": "GetPosts",
    "group": "Post",
    "description": "<p>Fetch All Posts</p>",
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": " [\n    {\n        \"_id\": \"5a00653f8bf841181c354173\",\n        \"content\": \"What is Lorem Ipsum?Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum\",\n        \"category\": {\n            \"_id\": \"59fb0856b833462470fe234d\",\n            \"name\": \"Bids\"\n        },\n        \"created_at\": \"2017-11-06T13:35:59.476Z\",\n        \"created_by\": \"5a00604b9c68619e0115acb4\",\n        \"organization\": {\n            \"_id\": \"5a00604b9c68619e0115acb5\",\n            \"org_name\": \"GoldG\",\n            \"sector\": \"59faf11b0aee4d9211b906b6\",\n            \"created_at\": \"2017-11-06T13:14:51.847Z\",\n            \"user\": \"5a00604b9c68619e0115acb4\",\n            \"updated_at\": null,\n            \"archived_at\": null,\n            \"archived\": false,\n            \"folower\": []\n        },\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"comments\": []\n    }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/post.js",
    "groupTitle": "Post"
  },
  {
    "type": "put",
    "url": "/posts/:id/comments",
    "title": "Remove Comment",
    "name": "RemoveComment",
    "group": "Post",
    "description": "<p>Remove Comment</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "comment",
            "description": "<p>Comment ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n\"comment\":\"sdsldksjdjsldjsld\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n    \"_id\": \"5a02eea1c2476110718224d6\",\n    \"content\": \"What is Lorem Ipsum?Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum\",\n    \"category\": {\n        \"_id\": \"59fb0856b833462470fe234d\",\n        \"name\": \"Bids\"\n    },\n    \"created_at\": \"2017-11-08T11:46:41.875Z\",\n    \"created_by\": \"59fc4ad6596bcb4c4a133cfb\",\n    \"updated_at\": \"2017-11-08T11:49:46.526Z\",\n    \"archived_at\": null,\n    \"archived\": false,\n    \"status\": \"active\",\n    \"comments\": [\n        {\n            \"_id\": \"5a02ef5ab07baa3c75d6c4e4\",\n            \"comment\": \"What is Lorem Ipsum?Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum\",\n            \"created_at\": \"2017-11-08T11:49:46.526Z\",\n            \"created_by\": \"59fc4ad6596bcb4c4a133cfb\",\n            \"post\": \"5a02eea1c2476110718224d6\",\n            \"updated_at\": null,\n            \"archived_at\": null,\n            \"archived\": false\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/post.js",
    "groupTitle": "Post"
  },
  {
    "type": "put",
    "url": "/posts/:id",
    "title": "UpdatePost",
    "name": "UpdatePost",
    "group": "Post",
    "description": "<p>Update Post</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>postId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n     \"_id\": \"5a00653f8bf841181c354173\",\n     \"content\": \"What is Lorem Ipsum?Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum\",\n     \"category\": {\n         \"_id\": \"59fb0856b833462470fe234d\",\n         \"name\": \"Bids\"\n     },\n     \"created_at\": \"2017-11-06T13:35:59.476Z\",\n     \"created_by\": \"5a00604b9c68619e0115acb4\",\n     \"organization\": {\n         \"_id\": \"5a00604b9c68619e0115acb5\",\n         \"org_name\": \"GoldG\",\n         \"sector\": \"59faf11b0aee4d9211b906b6\",\n         \"created_at\": \"2017-11-06T13:14:51.847Z\",\n         \"user\": \"5a00604b9c68619e0115acb4\",\n         \"updated_at\": null,\n         \"archived_at\": null,\n         \"archived\": false,\n         \"folower\": []\n     },\n     \"updated_at\": null,\n     \"archived_at\": null,\n     \"archived\": false,\n     \"comments\": []\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/post.js",
    "groupTitle": "Post"
  },
  {
    "type": "post",
    "url": "/preferences",
    "title": "Create Preference",
    "version": "1.0.0",
    "name": "CreatePreference",
    "group": "Preference",
    "description": "<p>Create Preference</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "category",
            "description": "<p>category ID</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "sectors",
            "description": "<p>Sector ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "     [{\n\t\t\"category\":\"59fb0856b833462470fe234d\",\n\t\t\"sectors\":[\"5a0347fd3403a09322ca405b\",\"5a034701bf2243f820d2f05e\"]\n        },\n        {\n                \"category\":\"59FD40920DEFF5BE1014FC5C\",\n                \"sectors\":[\"5a034701bf2243f820d2f05e\",\"5a0347833403a09322ca405a\"]\n        }\n        ]",
          "type": "json"
        }
      ]
    },
    "filename": "routes/preference.js",
    "groupTitle": "Preference"
  },
  {
    "type": "get",
    "url": "/preferences",
    "title": "Get Preference",
    "version": "1.0.0",
    "name": "GetPreference",
    "group": "Preference",
    "description": "<p>Get Preference</p>",
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": "\n[\n    {\n        \"_id\": \"5a0d843282c71033296b6365\",\n        \"user\": \"59fc4ad6596bcb4c4a133cfb\",\n        \"category\": \"59fb0856b833462470fe234d\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"sectors\": [\n            \"5a0347fd3403a09322ca405b\",\n            \"5a034701bf2243f820d2f05e\"\n        ]\n    },\n    {\n        \"_id\": \"5a0d843282c71033296b6366\",\n        \"user\": \"59fc4ad6596bcb4c4a133cfb\",\n        \"category\": \"59fd40920deff5be1014fc5c\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"sectors\": [\n            \"5a034701bf2243f820d2f05e\",\n            \"5a0347833403a09322ca405a\"\n        ]\n    }\n]",
          "type": "json"
        }
      ]
    },
    "filename": "routes/preference.js",
    "groupTitle": "Preference"
  },
  {
    "type": "post",
    "url": "/sectors",
    "title": "Create Sector",
    "name": "CreateSector",
    "group": "Sector",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Sector Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "parent",
            "description": "<p>Top/Higher Sector Id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n  \"name\":\"Finance\"\n  \"parent\": \"3483jfdjfhdj39395395\"\n}",
          "type": "json"
        }
      ]
    },
    "description": "<p>Create Sector</p>",
    "version": "0.0.0",
    "filename": "routes/sector.js",
    "groupTitle": "Sector"
  },
  {
    "type": "get",
    "url": "/sectors/:id/child",
    "title": "Fetch One Sector",
    "name": "FetchOneSector",
    "group": "Sector",
    "description": "<p>Get Sector Childs</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>sectorId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n    \"_id\": \"59f9be95a06275b86aa01e81\",\n    \"name\": \"Finance\",\n    \"updated_at\": null,\n    \"archived_at\": null,\n    \"archived\": false,\n    \"parent\":\"59f9be76a06275b86aa01e80\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/sector.js",
    "groupTitle": "Sector"
  },
  {
    "type": "get",
    "url": "/sectors/parents",
    "title": "Get Parent Sectors",
    "name": "GetParentSectors",
    "group": "Sector",
    "description": "<p>Fetch All Parent Sectors</p>",
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": " [\n    {\n        \"_id\": \"59faf11b0aee4d9211b906b6\",\n        \"name\": \"Educational\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fb03a8a058f2cc475ee36e\",\n        \"name\": \"Educational\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd567592a0452f7644f295\",\n        \"name\": \"Test Sector\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd70060b06682053bc70ac\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T07:45:10.220Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd73170b06682053bc70ad\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T07:58:15.994Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd738b0b06682053bc70ae\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T08:00:11.002Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd74901a69446a6227cae1\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T08:04:32.555Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd750453ad85da63dd877b\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T08:06:28.154Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd75191167110864ed312b\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T08:06:49.247Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd752928083d30647e72b6\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T08:07:05.446Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd754c000f11e864536833\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T08:07:40.715Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd75738b5087c66508c3e5\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T08:08:19.105Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd7584040a3efa6582d359\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T08:08:36.345Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd759edf56814a668baf07\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T08:09:02.309Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd75c863e87b31674e7ee4\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T08:09:44.155Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd75d8734043666773c0ad\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T08:10:00.241Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd764189bd8ab068a3fb80\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T08:11:45.058Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd767b32a6162d6ac2c1f2\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T08:12:43.154Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd7698ea7283756ae9e7d6\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T08:13:12.134Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd76a7ea7283756ae9e7d7\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T08:13:27.050Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd76a8ea7283756ae9e7d8\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T08:13:28.044Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd76b4ea7283756ae9e7d9\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T08:13:40.105Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd76c841ca6a4e6b8af86d\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T08:14:00.380Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd76dc2abc97a16bb28e5c\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T08:14:20.026Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fea82ec047af7165ec555d\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-05T05:57:02.703Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fea848c047af7165ec555e\",\n        \"name\": \"xxxxxxxxxxxx\",\n        \"created_at\": \"2017-11-05T05:57:28.397Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fea87449a3df09672ae5f8\",\n        \"name\": \"xxxxxxxxxxxx\",\n        \"created_at\": \"2017-11-05T05:58:12.236Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fea87749a3df09672ae5f9\",\n        \"name\": \"xxxxxxxxxxxx\",\n        \"created_at\": \"2017-11-05T05:58:15.154Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fea87b49a3df09672ae5fa\",\n        \"name\": \"xxxxxxxxxxxx\",\n        \"created_at\": \"2017-11-05T05:58:19.966Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fea89e41d8695c678553e5\",\n        \"name\": \"xxxxxxxxxxxx\",\n        \"created_at\": \"2017-11-05T05:58:53.997Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fea8b641d8695c678553e6\",\n        \"name\": \"xxxxxxxxxxxx\",\n        \"created_at\": \"2017-11-05T05:59:18.244Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fea8c8d4e51609687cf153\",\n        \"name\": \"xxxxxxxxxxxx\",\n        \"created_at\": \"2017-11-05T05:59:36.287Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fea900600ce7d168a7905f\",\n        \"name\": \"xxxxxxxxxxxx\",\n        \"created_at\": \"2017-11-05T06:00:32.628Z\",\n        \"created_by\": {\n            \"_id\": \"59fc4ad6596bcb4c4a133cfb\",\n            \"username\": \"1wgida@gmail.com\",\n            \"role\": \"client\",\n            \"realm\": \"admin\",\n            \"last_login\": \"2017-11-06T11:03:02.982Z\",\n            \"archived_at\": null,\n            \"archived\": false,\n            \"status\": \"active\"\n        },\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59feb41bbe80b77e0ab33d01\",\n        \"name\": \"SECTOR TESTTSTTSTSS\",\n        \"created_at\": \"2017-11-05T06:47:55.678Z\",\n        \"created_by\": {\n            \"_id\": \"59fc4ad6596bcb4c4a133cfb\",\n            \"username\": \"1wgida@gmail.com\",\n            \"role\": \"client\",\n            \"realm\": \"admin\",\n            \"last_login\": \"2017-11-06T11:03:02.982Z\",\n            \"archived_at\": null,\n            \"archived\": false,\n            \"status\": \"active\"\n        },\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59ff14b35af5433f28db1de1\",\n        \"name\": \"SECTOR TESTTSTTSTSS\",\n        \"created_at\": \"2017-11-05T13:40:03.201Z\",\n        \"created_by\": {\n            \"_id\": \"59fc4ad6596bcb4c4a133cfb\",\n            \"username\": \"1wgida@gmail.com\",\n            \"role\": \"client\",\n            \"realm\": \"admin\",\n            \"last_login\": \"2017-11-06T11:03:02.982Z\",\n            \"archived_at\": null,\n            \"archived\": false,\n            \"status\": \"active\"\n        },\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59ff14ff61d08b1829e56dc0\",\n        \"name\": \"SECTOR TESTTSTTSTSS\",\n        \"created_at\": \"2017-11-05T13:41:19.426Z\",\n        \"created_by\": {\n            \"_id\": \"59fc4ad6596bcb4c4a133cfb\",\n            \"username\": \"1wgida@gmail.com\",\n            \"role\": \"client\",\n            \"realm\": \"admin\",\n            \"last_login\": \"2017-11-06T11:03:02.982Z\",\n            \"archived_at\": null,\n            \"archived\": false,\n            \"status\": \"active\"\n        },\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59ff15158828b06329b5a736\",\n        \"name\": \"SECTOR TESTTSTTSTSS\",\n        \"created_at\": \"2017-11-05T13:41:41.436Z\",\n        \"created_by\": {\n            \"_id\": \"59fc4ad6596bcb4c4a133cfb\",\n            \"username\": \"1wgida@gmail.com\",\n            \"role\": \"client\",\n            \"realm\": \"admin\",\n            \"last_login\": \"2017-11-06T11:03:02.982Z\",\n            \"archived_at\": null,\n            \"archived\": false,\n            \"status\": \"active\"\n        },\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59ff15392ac5ba672a85114b\",\n        \"name\": \"SECTOR FINALE TEST\",\n        \"created_at\": \"2017-11-05T13:42:17.900Z\",\n        \"created_by\": {\n            \"_id\": \"59fc4ad6596bcb4c4a133cfb\",\n            \"username\": \"1wgida@gmail.com\",\n            \"role\": \"client\",\n            \"realm\": \"admin\",\n            \"last_login\": \"2017-11-06T11:03:02.982Z\",\n            \"archived_at\": null,\n            \"archived\": false,\n            \"status\": \"active\"\n        },\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/sector.js",
    "groupTitle": "Sector"
  },
  {
    "type": "get",
    "url": "/sectors/:id/child",
    "title": "Get Sectors Childs",
    "name": "GetSectorChilds",
    "group": "Sector",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>sectorId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "[\n    {\n        \"_id\": \"59f9be95a06275b86aa01e81\",\n        \"name\": \"Finance\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": {\n            \"_id\": \"59f9be76a06275b86aa01e80\",\n            \"name\": \"Ethiopia\",\n            \"updated_at\": null,\n            \"archived_at\": null,\n            \"archived\": false,\n            \"parent\": null\n        }\n    }\n]",
          "type": "json"
        }
      ]
    },
    "description": "<p>Get Sector Childs</p>",
    "version": "0.0.0",
    "filename": "routes/sector.js",
    "groupTitle": "Sector"
  },
  {
    "type": "get",
    "url": "/sectors",
    "title": "Get Sectors",
    "name": "GetSectors",
    "group": "Sector",
    "description": "<p>Fetch All Sectors</p>",
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": "[\n    {\n        \"_id\": \"59faf11b0aee4d9211b906b6\",\n        \"name\": \"Educational\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59faf5d55621a8232a6708b4\",\n        \"name\": \"Bank\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": \"59f9b26810e9df6739fe13ae\"\n    },\n    {\n        \"_id\": \"59faf6215621a8232a6708b5\",\n        \"name\": \"Abay Bank\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": \"59faf5d55621a8232a6708b4\"\n    },\n    {\n        \"_id\": \"59fb03a8a058f2cc475ee36e\",\n        \"name\": \"Educational\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fb03a9a058f2cc475ee36f\",\n        \"name\": \"Education\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": \"59f9b26810e9df6739fe13ae\"\n    },\n    {\n        \"_id\": \"59fc455034494e2e28b6cfc1\",\n        \"name\": \"Announcement\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": \"5936c2e4b316401548d27175\"\n    },\n    {\n        \"_id\": \"59fd4a64db4d87395059f5ca\",\n        \"name\": \"Financial\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": \"5936c2e4b316401548d27175\"\n    },\n    {\n        \"_id\": \"59fd4a7edb4d87395059f5cb\",\n        \"name\": \"Insurance\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": \"59fd4a64db4d87395059f5ca\"\n    },\n    {\n        \"_id\": \"59fd567592a0452f7644f295\",\n        \"name\": \"Test Sector\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd568992a0452f7644f296\",\n        \"name\": \"Child Sector\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": \"59fd567592a0452f7644f295\"\n    },\n    {\n        \"_id\": \"59fd574292a0452f7644f297\",\n        \"name\": \"Micro Finance\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": \"59fd4a64db4d87395059f5ca\"\n    },\n    {\n        \"_id\": \"59fd70060b06682053bc70ac\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T07:45:10.220Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd73170b06682053bc70ad\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T07:58:15.994Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd738b0b06682053bc70ae\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T08:00:11.002Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd74901a69446a6227cae1\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T08:04:32.555Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd750453ad85da63dd877b\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T08:06:28.154Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd75191167110864ed312b\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T08:06:49.247Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd752928083d30647e72b6\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T08:07:05.446Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd754c000f11e864536833\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T08:07:40.715Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd75738b5087c66508c3e5\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T08:08:19.105Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd7584040a3efa6582d359\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T08:08:36.345Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd759edf56814a668baf07\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T08:09:02.309Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd75c863e87b31674e7ee4\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T08:09:44.155Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd75d8734043666773c0ad\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T08:10:00.241Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd764189bd8ab068a3fb80\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T08:11:45.058Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd767b32a6162d6ac2c1f2\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T08:12:43.154Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd7698ea7283756ae9e7d6\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T08:13:12.134Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd76a7ea7283756ae9e7d7\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T08:13:27.050Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd76a8ea7283756ae9e7d8\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T08:13:28.044Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd76b4ea7283756ae9e7d9\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T08:13:40.105Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd76c841ca6a4e6b8af86d\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T08:14:00.380Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fd76dc2abc97a16bb28e5c\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-04T08:14:20.026Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fea82ec047af7165ec555d\",\n        \"name\": \"1wgida@gmail.com\",\n        \"created_at\": \"2017-11-05T05:57:02.703Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fea848c047af7165ec555e\",\n        \"name\": \"xxxxxxxxxxxx\",\n        \"created_at\": \"2017-11-05T05:57:28.397Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fea87449a3df09672ae5f8\",\n        \"name\": \"xxxxxxxxxxxx\",\n        \"created_at\": \"2017-11-05T05:58:12.236Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fea87749a3df09672ae5f9\",\n        \"name\": \"xxxxxxxxxxxx\",\n        \"created_at\": \"2017-11-05T05:58:15.154Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fea87b49a3df09672ae5fa\",\n        \"name\": \"xxxxxxxxxxxx\",\n        \"created_at\": \"2017-11-05T05:58:19.966Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fea89e41d8695c678553e5\",\n        \"name\": \"xxxxxxxxxxxx\",\n        \"created_at\": \"2017-11-05T05:58:53.997Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fea8b641d8695c678553e6\",\n        \"name\": \"xxxxxxxxxxxx\",\n        \"created_at\": \"2017-11-05T05:59:18.244Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fea8c8d4e51609687cf153\",\n        \"name\": \"xxxxxxxxxxxx\",\n        \"created_at\": \"2017-11-05T05:59:36.287Z\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59fea900600ce7d168a7905f\",\n        \"name\": \"xxxxxxxxxxxx\",\n        \"created_at\": \"2017-11-05T06:00:32.628Z\",\n        \"created_by\": {\n            \"_id\": \"59fc4ad6596bcb4c4a133cfb\",\n            \"username\": \"1wgida@gmail.com\",\n            \"role\": \"client\",\n            \"realm\": \"admin\",\n            \"last_login\": \"2017-11-06T11:03:02.982Z\",\n            \"archived_at\": null,\n            \"archived\": false,\n            \"status\": \"active\"\n        },\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59feb02c600ce7d168a79061\",\n        \"name\": \"Abysinya Bank\",\n        \"created_at\": \"2017-11-05T06:31:08.532Z\",\n        \"created_by\": {\n            \"_id\": \"59faf061f82580701438268c\",\n            \"username\": \"mom@test.com\",\n            \"role\": \"admin\",\n            \"realm\": \"admin\",\n            \"last_login\": \"2017-11-06T10:33:39.760Z\",\n            \"archived_at\": null,\n            \"archived\": false,\n            \"status\": \"active\"\n        },\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": \"59faf5d55621a8232a6708b4\"\n    },\n    {\n        \"_id\": \"59feb41bbe80b77e0ab33d01\",\n        \"name\": \"SECTOR TESTTSTTSTSS\",\n        \"created_at\": \"2017-11-05T06:47:55.678Z\",\n        \"created_by\": {\n            \"_id\": \"59fc4ad6596bcb4c4a133cfb\",\n            \"username\": \"1wgida@gmail.com\",\n            \"role\": \"client\",\n            \"realm\": \"admin\",\n            \"last_login\": \"2017-11-06T11:03:02.982Z\",\n            \"archived_at\": null,\n            \"archived\": false,\n            \"status\": \"active\"\n        },\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59febc7dd1582d1911a15003\",\n        \"name\": \"Nyala Insurance C.O\",\n        \"created_at\": \"2017-11-05T07:23:41.061Z\",\n        \"created_by\": {\n            \"_id\": \"59faf061f82580701438268c\",\n            \"username\": \"mom@test.com\",\n            \"role\": \"admin\",\n            \"realm\": \"admin\",\n            \"last_login\": \"2017-11-06T10:33:39.760Z\",\n            \"archived_at\": null,\n            \"archived\": false,\n            \"status\": \"active\"\n        },\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": \"59fd4a7edb4d87395059f5cb\"\n    },\n    {\n        \"_id\": \"59ff14b35af5433f28db1de1\",\n        \"name\": \"SECTOR TESTTSTTSTSS\",\n        \"created_at\": \"2017-11-05T13:40:03.201Z\",\n        \"created_by\": {\n            \"_id\": \"59fc4ad6596bcb4c4a133cfb\",\n            \"username\": \"1wgida@gmail.com\",\n            \"role\": \"client\",\n            \"realm\": \"admin\",\n            \"last_login\": \"2017-11-06T11:03:02.982Z\",\n            \"archived_at\": null,\n            \"archived\": false,\n            \"status\": \"active\"\n        },\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59ff14ff61d08b1829e56dc0\",\n        \"name\": \"SECTOR TESTTSTTSTSS\",\n        \"created_at\": \"2017-11-05T13:41:19.426Z\",\n        \"created_by\": {\n            \"_id\": \"59fc4ad6596bcb4c4a133cfb\",\n            \"username\": \"1wgida@gmail.com\",\n            \"role\": \"client\",\n            \"realm\": \"admin\",\n            \"last_login\": \"2017-11-06T11:03:02.982Z\",\n            \"archived_at\": null,\n            \"archived\": false,\n            \"status\": \"active\"\n        },\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59ff15158828b06329b5a736\",\n        \"name\": \"SECTOR TESTTSTTSTSS\",\n        \"created_at\": \"2017-11-05T13:41:41.436Z\",\n        \"created_by\": {\n            \"_id\": \"59fc4ad6596bcb4c4a133cfb\",\n            \"username\": \"1wgida@gmail.com\",\n            \"role\": \"client\",\n            \"realm\": \"admin\",\n            \"last_login\": \"2017-11-06T11:03:02.982Z\",\n            \"archived_at\": null,\n            \"archived\": false,\n            \"status\": \"active\"\n        },\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    },\n    {\n        \"_id\": \"59ff15392ac5ba672a85114b\",\n        \"name\": \"SECTOR FINALE TEST\",\n        \"created_at\": \"2017-11-05T13:42:17.900Z\",\n        \"created_by\": {\n            \"_id\": \"59fc4ad6596bcb4c4a133cfb\",\n            \"username\": \"1wgida@gmail.com\",\n            \"role\": \"client\",\n            \"realm\": \"admin\",\n            \"last_login\": \"2017-11-06T11:03:02.982Z\",\n            \"archived_at\": null,\n            \"archived\": false,\n            \"status\": \"active\"\n        },\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"parent\": null\n    }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/sector.js",
    "groupTitle": "Sector"
  },
  {
    "type": "put",
    "url": "/sectors/:id",
    "title": "UpdateSector",
    "name": "UpdaetSector",
    "group": "Sector",
    "description": "<p>Update Sector</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>sectorId</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n    \"_id\": \"59f9be95a06275b86aa01e81\",\n    \"name\": \"Finance\",\n    \"updated_at\": null,\n    \"archived_at\": null,\n    \"archived\": false,\n    \"parent\":\"59f9be76a06275b86aa01e80\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/sector.js",
    "groupTitle": "Sector"
  },
  {
    "type": "delete",
    "url": "/users/:id/Archive",
    "title": "Delete User",
    "version": "1.0.0",
    "name": "Delete",
    "group": "User",
    "description": "<p>Archive a user with the given id</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>user id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"_id\" : \"556e1174a8952c9521286a60\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "delete",
    "url": "/users/:id",
    "title": "Delete User",
    "version": "1.0.0",
    "name": "Delete",
    "group": "User",
    "description": "<p>Delete a user with the given id</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>user id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"_id\" : \"556e1174a8952c9521286a60\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "Get users collection",
    "version": "1.0.0",
    "name": "FetchAll",
    "group": "User",
    "description": "<p>Get a collection of users.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>user id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "[{\n    \"_id\" : \"556e1174a8952c9521286a60\",\n}]",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/paginate?page=<RESULTS_PAGE>&per_page=<RESULTS_PER_PAGE>",
    "title": "Get paginated users collection",
    "version": "1.0.0",
    "name": "FetchPaginated",
    "group": "User",
    "description": "<p>Get a collection of users. The endpoint has pagination out of the box. Use these params to query with pagination: <code>page=&lt;RESULTS_PAGE</code> and <code>per_page=&lt;RESULTS_PER_PAGE&gt;</code>.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>user id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"total_pages\": 1,\n  \"total_docs_count\": 0,\n  \"docs\": [{\n    \"_id\" : \"556e1174a8952c9521286a60\",\n  }]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "Get User",
    "version": "1.0.0",
    "name": "Get",
    "group": "User",
    "description": "<p>Get a user with the given id</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>user id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"_id\" : \"556e1174a8952c9521286a60\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users/login",
    "title": "Login a user",
    "version": "1.0.0",
    "name": "Login",
    "group": "User",
    "description": "<p>Log in a user. The request returns a token used to authentication of the user on subsequent requests. The token is placed as an HTTP header ie <code>Authorization: Bearer &lt;Token-here&gt;</code> otherwise requests are rejected.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n  \"username\":\"tasuser\"\n  \"password\": \"pass@123\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>auth token</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>user info</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "attendee",
            "description": "<p>attendee info</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n    \"token\": \"SjaMLFTRjKcF\",\n    \"user\": {\n        \"_id\": \"59e4627a416a6a171b05c7f9\",\n        \"username\": \"a@ghwmail.com\",\n        \"created_at\": \"2017-10-16T07:40:42.695Z\",\n        \"password_changed\": false,\n        \"role\": \"attendee\",\n        \"realm\": \"user\",\n        \"attendee\": \"59e4627b416a6a171b05c7fa\",\n        \"last_login\": \"2017-10-22T06:24:17.284Z\",\n        \"archived_at\": null,\n        \"archived\": false,\n        \"status\": \"active\"\n    },\n   \n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users/logout",
    "title": "Logout a user",
    "version": "1.0.0",
    "name": "Logout",
    "group": "User",
    "description": "<p>Invalidate a users token</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Boolean",
            "optional": false,
            "field": "logged_out",
            "description": "<p>message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"logged_out\" : true\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/users/password/forgot",
    "title": "Reset Password",
    "version": "1.0.0",
    "name": "ResetPassword",
    "group": "User",
    "description": "<p>Reset password of a given user.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>User Email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n      \"email\":\"2email1@gmail.com\",\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": "HTTP/1.1 200 OK\n   {\n       \"error\": false,\n       \"msg\": \"Suceesfully Reset, Please check your email \"\n       \"status\": 200\n   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users/signup",
    "title": "Signup User",
    "version": "1.0.0",
    "name": "Signup",
    "group": "User",
    "description": "<p>Signup  user</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user_type",
            "description": "<p>User Type Like admin,client or organization</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "org_name",
            "description": "<p>Organization Name if user type is organization</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fax",
            "description": "<p>Fax  if  user type is organization</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "POBOX",
            "description": "<p>Fax  if  user type is organization</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "first_name",
            "description": "<p>First Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "middle_name",
            "description": "<p>Middle Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "last_name",
            "description": "<p>Last Name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "mobile",
            "description": "<p>Users Mobile</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "facebook_link",
            "description": "<p>Facebook Link</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "twitter_link",
            "description": "<p>Twiter Link</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "linkedin_link",
            "description": "<p>Linkedin Link</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": true,
            "field": "date_of_birth",
            "description": "<p>DOB</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "city",
            "description": "<p>City</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "country",
            "description": "<p>Country</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "address",
            "description": "<p>Adress</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "gender",
            "description": "<p>Gender</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "about",
            "description": "<p>Bio</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "title",
            "description": "<p>Title</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n  \"username\":\"goldgy@gmail.com\",\n\t\"password\":\"123445555\",\n\t\"user_type\":\"organization\",\n\t\"org_name\":\"GoldG\",\n\t\"sector\":\"59faf11b0aee4d9211b906b6\"\n }",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response Example for Organization Signup:",
          "content": "\n{\n    \"_id\": \"5a00604b9c68619e0115acb4\",\n    \"username\": \"goldgy@gmail.com\",\n    \"role\": \"organization\",\n    \"realm\": \"admin\",\n    \"organization\": {\n        \"_id\": \"5a00604b9c68619e0115acb5\",\n        \"org_name\": \"GoldG\",\n        \"sector\": \"59faf11b0aee4d9211b906b6\",\n        \"created_at\": \"2017-11-06T13:14:51.847Z\",\n        \"user\": \"5a00604b9c68619e0115acb4\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"folower\": []\n    },\n    \"archived_at\": null,\n    \"archived\": false,\n    \"status\": \"active\"\n}",
          "type": "json"
        },
        {
          "title": "Response Example for Client Signup:",
          "content": "\n{\n    \"_id\": \"5a006134e4262bd2095701c8\",\n    \"username\": \"yeonas@gmail.com\",\n    \"role\": \"client\",\n    \"realm\": \"admin\",\n    \"client\": {\n        \"_id\": \"5a006134e4262bd2095701c9\",\n        \"created_at\": \"2017-11-06T13:18:44.801Z\",\n        \"user\": \"5a006134e4262bd2095701c8\",\n        \"updated_at\": null,\n        \"archived_at\": null,\n        \"archived\": false,\n        \"following\": []\n    },\n    \"archived_at\": null,\n    \"archived\": false,\n    \"status\": \"active\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/users/:id",
    "title": "Update User",
    "version": "1.0.0",
    "name": "Update",
    "group": "User",
    "description": "<p>Update a user with the given id</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "_id",
            "description": "<p>user id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"_id\" : \"556e1174a8952c9521286a60\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/users/password/update",
    "title": "Update user password",
    "version": "1.0.0",
    "name": "UpdatePassword",
    "group": "User",
    "description": "<p>Update password of a given user.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "security_question_answer",
            "description": "<p>security question answer</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone_number",
            "description": "<p>phone number</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "new_password",
            "description": "<p>new password/pin</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n      \"username\":\"2email1@gmail.com\",\n      \"old_password\":\"pass@123\",\n      \"new_password\":\"test@123\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Sucessfully changed.\",\n    \"status\": 200\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/user.js",
    "groupTitle": "User"
  }
] });
