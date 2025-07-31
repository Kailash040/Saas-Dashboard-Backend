const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a tenant name'],
    trim: true,
    maxlength: [100, 'Tenant name cannot be more than 100 characters']
  },
  domain: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true
  },
  subdomain: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true
  },
  company: {
    name: {
      type: String,
      required: [true, 'Please add a company name'],
      trim: true
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    },
    phone: String,
    website: String,
    logo: String
  },
  settings: {
    theme: {
      primaryColor: {
        type: String,
        default: '#3B82F6'
      },
      secondaryColor: {
        type: String,
        default: '#1F2937'
      },
      logo: String,
      favicon: String
    },
    features: {
      type: Map,
      of: Boolean,
      default: new Map()
    },
    limits: {
      users: {
        type: Number,
        default: 10
      },
      storage: {
        type: Number,
        default: 1024 // MB
      },
      apiCalls: {
        type: Number,
        default: 1000
      }
    }
  },
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'basic', 'pro', 'enterprise'],
      default: 'free'
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'cancelled', 'past_due', 'trial'],
      default: 'trial'
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    endDate: {
      type: Date
    },
    trialEndDate: {
      type: Date,
      default: function() {
        return new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // 14 days trial
      }
    },
    stripeCustomerId: String,
    stripeSubscriptionId: String,
    billingCycle: {
      type: String,
      enum: ['monthly', 'yearly'],
      default: 'monthly'
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  admins: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
});

// Index for better query performance
tenantSchema.index({ domain: 1 });
tenantSchema.index({ subdomain: 1 });
tenantSchema.index({ 'subscription.status': 1 });
tenantSchema.index({ isActive: 1 });

// Virtual for tenant URL
tenantSchema.virtual('url').get(function() {
  if (this.domain) {
    return `https://${this.domain}`;
  }
  if (this.subdomain) {
    return `https://${this.subdomain}.yourdomain.com`;
  }
  return null;
});

// Method to check if tenant is in trial
tenantSchema.methods.isInTrial = function() {
  return this.subscription.status === 'trial' && 
         this.subscription.trialEndDate > new Date();
};

// Method to check if tenant has active subscription
tenantSchema.methods.hasActiveSubscription = function() {
  return ['active', 'trial'].includes(this.subscription.status);
};

// Method to get subscription days remaining
tenantSchema.methods.getSubscriptionDaysRemaining = function() {
  if (this.subscription.status === 'trial') {
    const daysRemaining = Math.ceil((this.subscription.trialEndDate - new Date()) / (1000 * 60 * 60 * 24));
    return Math.max(0, daysRemaining);
  }
  if (this.subscription.endDate) {
    const daysRemaining = Math.ceil((this.subscription.endDate - new Date()) / (1000 * 60 * 60 * 24));
    return Math.max(0, daysRemaining);
  }
  return null;
};

// Pre-save middleware to set trial end date for new tenants
tenantSchema.pre('save', function(next) {
  if (this.isNew && !this.subscription.trialEndDate) {
    this.subscription.trialEndDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000); // 14 days
  }
  next();
});

module.exports = mongoose.model('Tenant', tenantSchema); 