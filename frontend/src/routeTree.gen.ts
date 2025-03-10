/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as TryoutIndexImport } from './routes/tryout/index'
import { Route as SubmissionIndexImport } from './routes/submission/index'
import { Route as SubmissionSubmissionIdImport } from './routes/submission/$submissionId'
import { Route as TryoutTryoutIdIndexImport } from './routes/tryout/$tryoutId/index'
import { Route as AdminTryoutIndexImport } from './routes/admin/tryout/index'
import { Route as TryoutTryoutIdAttemptImport } from './routes/tryout/$tryoutId/attempt'
import { Route as AdminTryoutCreateImport } from './routes/admin/tryout/create'
import { Route as AdminTryoutEditTryoutIdImport } from './routes/admin/tryout/edit/$tryoutId'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const TryoutIndexRoute = TryoutIndexImport.update({
  id: '/tryout/',
  path: '/tryout/',
  getParentRoute: () => rootRoute,
} as any)

const SubmissionIndexRoute = SubmissionIndexImport.update({
  id: '/submission/',
  path: '/submission/',
  getParentRoute: () => rootRoute,
} as any)

const SubmissionSubmissionIdRoute = SubmissionSubmissionIdImport.update({
  id: '/submission/$submissionId',
  path: '/submission/$submissionId',
  getParentRoute: () => rootRoute,
} as any)

const TryoutTryoutIdIndexRoute = TryoutTryoutIdIndexImport.update({
  id: '/tryout/$tryoutId/',
  path: '/tryout/$tryoutId/',
  getParentRoute: () => rootRoute,
} as any)

const AdminTryoutIndexRoute = AdminTryoutIndexImport.update({
  id: '/admin/tryout/',
  path: '/admin/tryout/',
  getParentRoute: () => rootRoute,
} as any)

const TryoutTryoutIdAttemptRoute = TryoutTryoutIdAttemptImport.update({
  id: '/tryout/$tryoutId/attempt',
  path: '/tryout/$tryoutId/attempt',
  getParentRoute: () => rootRoute,
} as any)

const AdminTryoutCreateRoute = AdminTryoutCreateImport.update({
  id: '/admin/tryout/create',
  path: '/admin/tryout/create',
  getParentRoute: () => rootRoute,
} as any)

const AdminTryoutEditTryoutIdRoute = AdminTryoutEditTryoutIdImport.update({
  id: '/admin/tryout/edit/$tryoutId',
  path: '/admin/tryout/edit/$tryoutId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/submission/$submissionId': {
      id: '/submission/$submissionId'
      path: '/submission/$submissionId'
      fullPath: '/submission/$submissionId'
      preLoaderRoute: typeof SubmissionSubmissionIdImport
      parentRoute: typeof rootRoute
    }
    '/submission/': {
      id: '/submission/'
      path: '/submission'
      fullPath: '/submission'
      preLoaderRoute: typeof SubmissionIndexImport
      parentRoute: typeof rootRoute
    }
    '/tryout/': {
      id: '/tryout/'
      path: '/tryout'
      fullPath: '/tryout'
      preLoaderRoute: typeof TryoutIndexImport
      parentRoute: typeof rootRoute
    }
    '/admin/tryout/create': {
      id: '/admin/tryout/create'
      path: '/admin/tryout/create'
      fullPath: '/admin/tryout/create'
      preLoaderRoute: typeof AdminTryoutCreateImport
      parentRoute: typeof rootRoute
    }
    '/tryout/$tryoutId/attempt': {
      id: '/tryout/$tryoutId/attempt'
      path: '/tryout/$tryoutId/attempt'
      fullPath: '/tryout/$tryoutId/attempt'
      preLoaderRoute: typeof TryoutTryoutIdAttemptImport
      parentRoute: typeof rootRoute
    }
    '/admin/tryout/': {
      id: '/admin/tryout/'
      path: '/admin/tryout'
      fullPath: '/admin/tryout'
      preLoaderRoute: typeof AdminTryoutIndexImport
      parentRoute: typeof rootRoute
    }
    '/tryout/$tryoutId/': {
      id: '/tryout/$tryoutId/'
      path: '/tryout/$tryoutId'
      fullPath: '/tryout/$tryoutId'
      preLoaderRoute: typeof TryoutTryoutIdIndexImport
      parentRoute: typeof rootRoute
    }
    '/admin/tryout/edit/$tryoutId': {
      id: '/admin/tryout/edit/$tryoutId'
      path: '/admin/tryout/edit/$tryoutId'
      fullPath: '/admin/tryout/edit/$tryoutId'
      preLoaderRoute: typeof AdminTryoutEditTryoutIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/submission/$submissionId': typeof SubmissionSubmissionIdRoute
  '/submission': typeof SubmissionIndexRoute
  '/tryout': typeof TryoutIndexRoute
  '/admin/tryout/create': typeof AdminTryoutCreateRoute
  '/tryout/$tryoutId/attempt': typeof TryoutTryoutIdAttemptRoute
  '/admin/tryout': typeof AdminTryoutIndexRoute
  '/tryout/$tryoutId': typeof TryoutTryoutIdIndexRoute
  '/admin/tryout/edit/$tryoutId': typeof AdminTryoutEditTryoutIdRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/submission/$submissionId': typeof SubmissionSubmissionIdRoute
  '/submission': typeof SubmissionIndexRoute
  '/tryout': typeof TryoutIndexRoute
  '/admin/tryout/create': typeof AdminTryoutCreateRoute
  '/tryout/$tryoutId/attempt': typeof TryoutTryoutIdAttemptRoute
  '/admin/tryout': typeof AdminTryoutIndexRoute
  '/tryout/$tryoutId': typeof TryoutTryoutIdIndexRoute
  '/admin/tryout/edit/$tryoutId': typeof AdminTryoutEditTryoutIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/submission/$submissionId': typeof SubmissionSubmissionIdRoute
  '/submission/': typeof SubmissionIndexRoute
  '/tryout/': typeof TryoutIndexRoute
  '/admin/tryout/create': typeof AdminTryoutCreateRoute
  '/tryout/$tryoutId/attempt': typeof TryoutTryoutIdAttemptRoute
  '/admin/tryout/': typeof AdminTryoutIndexRoute
  '/tryout/$tryoutId/': typeof TryoutTryoutIdIndexRoute
  '/admin/tryout/edit/$tryoutId': typeof AdminTryoutEditTryoutIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/submission/$submissionId'
    | '/submission'
    | '/tryout'
    | '/admin/tryout/create'
    | '/tryout/$tryoutId/attempt'
    | '/admin/tryout'
    | '/tryout/$tryoutId'
    | '/admin/tryout/edit/$tryoutId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/submission/$submissionId'
    | '/submission'
    | '/tryout'
    | '/admin/tryout/create'
    | '/tryout/$tryoutId/attempt'
    | '/admin/tryout'
    | '/tryout/$tryoutId'
    | '/admin/tryout/edit/$tryoutId'
  id:
    | '__root__'
    | '/'
    | '/submission/$submissionId'
    | '/submission/'
    | '/tryout/'
    | '/admin/tryout/create'
    | '/tryout/$tryoutId/attempt'
    | '/admin/tryout/'
    | '/tryout/$tryoutId/'
    | '/admin/tryout/edit/$tryoutId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  SubmissionSubmissionIdRoute: typeof SubmissionSubmissionIdRoute
  SubmissionIndexRoute: typeof SubmissionIndexRoute
  TryoutIndexRoute: typeof TryoutIndexRoute
  AdminTryoutCreateRoute: typeof AdminTryoutCreateRoute
  TryoutTryoutIdAttemptRoute: typeof TryoutTryoutIdAttemptRoute
  AdminTryoutIndexRoute: typeof AdminTryoutIndexRoute
  TryoutTryoutIdIndexRoute: typeof TryoutTryoutIdIndexRoute
  AdminTryoutEditTryoutIdRoute: typeof AdminTryoutEditTryoutIdRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  SubmissionSubmissionIdRoute: SubmissionSubmissionIdRoute,
  SubmissionIndexRoute: SubmissionIndexRoute,
  TryoutIndexRoute: TryoutIndexRoute,
  AdminTryoutCreateRoute: AdminTryoutCreateRoute,
  TryoutTryoutIdAttemptRoute: TryoutTryoutIdAttemptRoute,
  AdminTryoutIndexRoute: AdminTryoutIndexRoute,
  TryoutTryoutIdIndexRoute: TryoutTryoutIdIndexRoute,
  AdminTryoutEditTryoutIdRoute: AdminTryoutEditTryoutIdRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/submission/$submissionId",
        "/submission/",
        "/tryout/",
        "/admin/tryout/create",
        "/tryout/$tryoutId/attempt",
        "/admin/tryout/",
        "/tryout/$tryoutId/",
        "/admin/tryout/edit/$tryoutId"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/submission/$submissionId": {
      "filePath": "submission/$submissionId.tsx"
    },
    "/submission/": {
      "filePath": "submission/index.tsx"
    },
    "/tryout/": {
      "filePath": "tryout/index.tsx"
    },
    "/admin/tryout/create": {
      "filePath": "admin/tryout/create.tsx"
    },
    "/tryout/$tryoutId/attempt": {
      "filePath": "tryout/$tryoutId/attempt.tsx"
    },
    "/admin/tryout/": {
      "filePath": "admin/tryout/index.tsx"
    },
    "/tryout/$tryoutId/": {
      "filePath": "tryout/$tryoutId/index.tsx"
    },
    "/admin/tryout/edit/$tryoutId": {
      "filePath": "admin/tryout/edit/$tryoutId.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
