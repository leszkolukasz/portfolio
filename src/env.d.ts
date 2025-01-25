/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

interface Dictionary<T> {
    [Key: string]: T;
}