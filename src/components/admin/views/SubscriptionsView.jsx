import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import { SUBSCRIPTION_PLANS } from "../../../data/seedData";
import Modal from "../../common/Modal";
import {
  CreditCard,
  CheckCircle2,
  Clock,
  AlertCircle,
  Filter,
  Plus,
  Calendar,
  Sparkles,
  ShieldCheck,
  Edit2
} from "lucide-react";

export default function SubscriptionsView() {
  const { restaurants, updateSubscription, extendSubscription, notify } = useApp();

  const [statusFilter, setStatusFilter] = useState("all");
  const [editingSubRest, setEditingSubRest] = useState(null);
  const [subFormData, setSubFormData] = useState({
    planId: "monthly-plan",
    planName: "Monthly Pro",
    status: "active",
    expiryDate: "",
    paymentStatus: "Verified"
  });

  const filteredRestaurants = restaurants.filter((r) => {
    if (statusFilter === "all") return true;
    return r.subscription?.status === statusFilter;
  });

  const handleOpenEdit = (r) => {
    setEditingSubRest(r);
    setSubFormData({
      planId: r.subscription?.planId || "monthly-plan",
      planName: r.subscription?.planName || "Monthly Pro",
      status: r.subscription?.status || "active",
      expiryDate: r.subscription?.expiryDate || new Date().toISOString().split("T")[0],
      paymentStatus: r.subscription?.paymentStatus || "Verified"
    });
  };

  const handleSaveSub = (e) => {
    e.preventDefault();
    if (!editingSubRest) return;
    updateSubscription(editingSubRest.id, subFormData);
    setEditingSubRest(null);
  };

  return (
    <div className="admin-view-content subscriptions-view">
      <div className="view-header-bar">
        <div>
          <h2 className="view-title">Subscription & Plan Management</h2>
          <p className="view-subtitle">
            Manage billing plans, trial windows, manual extensions, and payment verification statuses.
          </p>
        </div>

        <div className="filter-select-box">
          <Filter size={15} />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Subscriptions ({restaurants.length})</option>
            <option value="active">Active Only</option>
            <option value="trial">Trial Accounts</option>
            <option value="expired">Expired Only</option>
          </select>
        </div>
      </div>

      {/* Plan Summary Boxes */}
      <div className="metrics-grid-3">
        {SUBSCRIPTION_PLANS.map((plan) => (
          <div key={plan.id} className="dashboard-card plan-summary-card">
            <div className="plan-summary-top">
              <span className="plan-summary-tag">{plan.billingCycle.toUpperCase()}</span>
              {plan.highlight && <span className="plan-highlight-pill">Featured</span>}
            </div>
            <h3 className="plan-summary-name">{plan.name}</h3>
            <div className="plan-summary-price">
              <span>₹{plan.price}</span>
              <small>/ {plan.durationLabel}</small>
            </div>
            <p className="plan-summary-desc">{plan.description}</p>
          </div>
        ))}
      </div>

      {/* Launch Offer Banner */}
      <div className="launch-offer-spotlight mt-6">
        <div className="offer-inner">
          <div className="offer-badge-col">
            <span className="offer-tag">LAUNCH CAMPAIGN</span>
            <Sparkles size={26} className="offer-sparkle-icon" />
          </div>
          <div className="offer-text-col">
            <h3>First 8 Small Shops Promotion</h3>
            <p>
              First 8 small shops receive a customised QR design free. Currently active across all registered accounts. Manual verification available below.
            </p>
          </div>
        </div>
      </div>

      {/* Subscription Table */}
      <div className="dashboard-card mt-6">
        <div className="card-header-row">
          <div>
            <h3 className="card-title">Restaurant Subscriptions</h3>
            <p className="card-sub">Active billing dates, status, and manual trial extensions</p>
          </div>
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Restaurant</th>
                <th>Plan Name</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>Expiry Date</th>
                <th>Payment Status</th>
                <th>Quick Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRestaurants.map((r) => {
                const sub = r.subscription || {
                  planName: "Free Trial (8 Days)",
                  status: "trial",
                  startDate: "2026-11-01",
                  expiryDate: "2026-11-09",
                  paymentStatus: "Trial Active"
                };

                const isExpired = new Date(sub.expiryDate) < new Date();

                return (
                  <tr key={r.id}>
                    <td>
                      <div className="table-rest-cell">
                        <span className="rest-avatar-sm">{r.logo || "🍽️"}</span>
                        <div>
                          <strong>{r.name}</strong>
                          <small>{r.ownerName || "No contact name"}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <strong>{sub.planName}</strong>
                    </td>
                    <td>
                      <span
                        className={`status-badge-sm ${
                          isExpired
                            ? "status-expired"
                            : sub.status === "active"
                            ? "status-active"
                            : "status-trial"
                        }`}
                      >
                        {isExpired ? "Expired" : sub.status === "active" ? "Active" : "Trial"}
                      </span>
                    </td>
                    <td>
                      <span className="date-text">{sub.startDate || "N/A"}</span>
                    </td>
                    <td>
                      <span className={`date-text ${isExpired ? "text-danger font-bold" : ""}`}>
                        {sub.expiryDate || "N/A"}
                      </span>
                    </td>
                    <td>
                      <span className="payment-status-pill">
                        {sub.paymentStatus || "Trial"}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions-cell">
                        <button
                          className="btn btn-outline btn-xs"
                          onClick={() => extendSubscription(r.id, 15)}
                          title="Add 15 Days to trial/subscription"
                        >
                          +15 Days
                        </button>
                        <button
                          className="btn btn-outline btn-xs"
                          onClick={() => handleOpenEdit(r)}
                          title="Edit subscription details"
                        >
                          <Edit2 size={13} /> Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="table-footnote-strip">
          <ShieldCheck size={15} />
          <span>Note: Real-time payment gateway integration (Razorpay/Stripe) can be connected for production. All subscription data is securely tracked in local administration.</span>
        </div>
      </div>

      {/* Edit Subscription Modal */}
      <Modal
        isOpen={Boolean(editingSubRest)}
        onClose={() => setEditingSubRest(null)}
        title={`Subscription: ${editingSubRest?.name}`}
        subtitle="Update plan tier, manual status, and expiration date"
        maxWidth="500px"
      >
        <form onSubmit={handleSaveSub} className="sub-edit-form">
          <label className="form-field-full">
            <span className="field-label">Plan Tier</span>
            <select
              value={subFormData.planId}
              onChange={(e) => {
                const p = SUBSCRIPTION_PLANS.find((x) => x.id === e.target.value);
                setSubFormData({
                  ...subFormData,
                  planId: e.target.value,
                  planName: p ? p.name : "Monthly Pro"
                });
              }}
            >
              <option value="free-trial">Free Trial (8 Days - ₹0)</option>
              <option value="extended-trial">Extended Trial Pass (15 Days - ₹100)</option>
              <option value="monthly-plan">Monthly Pro Plan (₹100/mo)</option>
            </select>
          </label>

          <label className="form-field-full">
            <span className="field-label">Subscription Status</span>
            <select
              value={subFormData.status}
              onChange={(e) => setSubFormData({ ...subFormData, status: e.target.value })}
            >
              <option value="active">Active (Full Access)</option>
              <option value="trial">Trial In Progress</option>
              <option value="expired">Expired / Paused</option>
            </select>
          </label>

          <label className="form-field-full">
            <span className="field-label">Expiry Date</span>
            <input
              type="date"
              value={subFormData.expiryDate}
              onChange={(e) => setSubFormData({ ...subFormData, expiryDate: e.target.value })}
            />
          </label>

          <label className="form-field-full">
            <span className="field-label">Payment Verification Status</span>
            <select
              value={subFormData.paymentStatus}
              onChange={(e) => setSubFormData({ ...subFormData, paymentStatus: e.target.value })}
            >
              <option value="Verified">Verified / Active</option>
              <option value="Pass Paid (₹100)">Pass Paid (₹100)</option>
              <option value="Trial Active">Trial Active</option>
              <option value="Pending Payment">Pending Payment</option>
              <option value="Free Launch Offer">Free Launch Offer</option>
            </select>
          </label>

          <div className="modal-actions-bar">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setEditingSubRest(null)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Subscription
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
