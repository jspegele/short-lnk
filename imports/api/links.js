import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'
import shortid from 'shortid'

export const Links = new Mongo.Collection('links')

if (Meteor.isServer) {
  Meteor.publish('links', function () {
    if (this.userId) {
      return Links.find({ userId: this.userId })
    } else {
      return Links.find({ anonymous: true })
    }
  })
}

Meteor.methods({
  'links.insert'(url, localId) {
    let anonymous = false
    let userId = this.userId
    if (!this.userId) {
      // throw new Meteor.Error('not-authorized')
      anonymous = true
      userId = localId
    }

    new SimpleSchema({
      url: {
        type: String,
        label: 'Your link',
        regEx: SimpleSchema.RegEx.Url
      }
    }).validate({ url })

    const _id = shortid.generate()

    Links.insert({
      _id,
      url,
      userId,
      createdAt: new Date().getTime(),
      anonymous,
      visible: true,
      visitedCount: 0,
      lastVisitedAt: null
    })

    return _id
  },

  'links.remove'(_id) {
    let itemOwner = Links.findOne({ _id }).userId

    if (!this.userId || this.userId !== itemOwner) {
      throw new Meteor.Error('not-authorized')
    }

    Links.remove({ _id })
  },

  'links.setVisibility'(_id, visible) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      visible: {
        type: Boolean
      }
    }).validate({ _id, visible})

    Links.update({
      _id,
      userId: this.userId
    }, {
      $set: { visible }
    })
  },

  'links.trackVisit'(_id) {
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id})

    Links.update(_id, {
      $set: {
        lastVisitedAt: new Date().getTime()
      },
      $inc: {
        visitedCount: 1
      }
    })
  }
})
