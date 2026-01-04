// Service Queries
export const servicesQuery = `*[_type == "service"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  coverImage,
  shortDescription,
  description
}`

export const serviceBySlugQuery = `*[_type == "service" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  coverImage,
  imageList,
  shortDescription,
  description,
  expertises
}`

// Project Queries
export const projectsQuery = `*[_type == "project"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  image,
  description
}`

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  image,
  description
}`

// Vacancy Queries
export const vacanciesQuery = `*[_type == "vacancy"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  location,
  workType,
  aboutTheRole
}`

export const vacancyBySlugQuery = `*[_type == "vacancy" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  location,
  workType,
  aboutTheRole,
  responsibilities,
  requirements
}`

// Partner Queries
export const partnersQuery = `*[_type == "partner"] | order(order asc) {
  _id,
  name,
  logo,
  order
}`

