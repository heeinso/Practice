const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slash = require(`slash`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    graphql(
      `
        {
          allContentfulProduct(limit: 1000) {
            edges {
              node {
                id
                contentful_id
                node_locale
              }
            }
          }
        }
      `
    )
      .then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        const productTemplate = path.resolve(`./src/templates/product.js`)
        _.each(result.data.allContentfulProduct.edges, edge => {
          const commonId = edge.node.contentful_id
          createPage({
            path: `/${edge.node.node_locale}/products/${commonId}/`,
            component: slash(productTemplate),
            context: {
              id: edge.node.id,
              contentful_id:  edge.node.contentful_id,
            },
          })
        })
      })
      .then(() => {
        graphql(
          `
            {
              allContentfulCategory(limit: 1000) {
                edges {
                  node {
                    id
                    contentful_id
                    node_locale
                  }
                }
              }
            }
          `
        ).then(result => {
          if (result.errors) {
            reject(result.errors)
          }
          const categoryTemplate = path.resolve(`./src/templates/category.js`)
          _.each(result.data.allContentfulCategory.edges, edge => {
            const commonId = edge.node.contentful_id
            createPage({
              path: `/${edge.node.node_locale}/categories/${commonId}/`,
              component: slash(categoryTemplate),
              context: {
                id: edge.node.id,
                contentful_id:  edge.node.contentful_id,
              },
            })
          })
          resolve()
        })
      })
  })
}
