import React, { useState } from "react";
import { useApp } from "../../../context/AppContext";
import Modal from "../../common/Modal";
import ConfirmDialog from "../../common/ConfirmDialog";
import {
  MessageSquare,
  Search,
  Filter,
  Phone,
  Mail,
  Calendar,
  CheckCircle2,
  Trash2,
  Eye,
  User,
  Store,
  MapPin,
  Clock,
  Sparkles
} from "lucide-react";

export default function EnquiriesView() {
  const { enquiries, updateEnquiryStatus, deleteEnquiry } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = enquiries.filter((e) => {
    const matchesSearch =
      e.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.restaurantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-view-content enquiries-view">
      <div className="view-header-bar">
        <div>
          <h2 className="view-title">Customer Enquiries & Leads</h2>
          <p className="view-subtitle">
            Prospective restaurant signups, launch offer requests, and support queries.
          </p>
        </div>

        <div className="view-filter-bar no-margin">
          <div className="search-input-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search by customer, phone, message..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-select-box">
            <Filter size={15} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses ({enquiries.length})</option>
              <option value="New">New Only</option>
              <option value="Contacted">Contacted</option>
              <option value="Converted">Converted</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state-card">
          <MessageSquare size={44} className="empty-state-icon" />
          <h3>No Enquiries Found</h3>
          <p>No enquiries match your current search or filter criteria.</p>
        </div>
      ) : (
        <div className="dashboard-card p-0">
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Customer & Business</th>
                  <th>Contact Details</th>
                  <th>Message Preview</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="enquiry-customer-cell">
                        <strong>{item.customerName}</strong>
                        <span className="business-sub">
                          <Store size={12} /> {item.restaurantName}
                        </span>
                        {item.city && <small className="city-sub">{item.city}</small>}
                      </div>
                    </td>
                    <td>
                      <div className="enquiry-contact-cell">
                        <a href={`tel:${item.phone}`} className="phone-link">
                          <Phone size={13} /> {item.phone}
                        </a>
                        {item.email && (
                          <a href={`mailto:${item.email}`} className="email-link">
                            <Mail size={13} /> {item.email}
                          </a>
                        )}
                      </div>
                    </td>
                    <td>
                      <p className="enquiry-msg-snippet" title={item.message}>
                        {item.message}
                      </p>
                    </td>
                    <td>
                      <span className="date-text">
                        {new Date(item.date).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric"
                        })}
                      </span>
                    </td>
                    <td>
                      <select
                        className={`enquiry-status-select status-${item.status.toLowerCase()}`}
                        value={item.status}
                        onChange={(e) => updateEnquiryStatus(item.id, e.target.value)}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Converted">Converted</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td>
                      <div className="table-actions-cell">
                        <button
                          className="btn-icon-table"
                          onClick={() => setSelectedEnquiry(item)}
                          title="View Full Details"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          className="btn-icon-table text-danger"
                          onClick={() => setDeleteTarget(item)}
                          title="Delete Enquiry"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View Enquiry Details Modal */}
      <Modal
        isOpen={Boolean(selectedEnquiry)}
        onClose={() => setSelectedEnquiry(null)}
        title="Enquiry Details"
        subtitle={`From ${selectedEnquiry?.customerName} (${selectedEnquiry?.restaurantName})`}
        maxWidth="540px"
      >
        {selectedEnquiry && (
          <div className="enquiry-detail-body">
            <div className="detail-meta-grid">
              <div className="detail-meta-item">
                <span className="meta-label">Customer Name</span>
                <strong>{selectedEnquiry.customerName}</strong>
              </div>
              <div className="detail-meta-item">
                <span className="meta-label">Restaurant / Shop</span>
                <strong>{selectedEnquiry.restaurantName}</strong>
              </div>
              <div className="detail-meta-item">
                <span className="meta-label">Phone Number</span>
                <a href={`tel:${selectedEnquiry.phone}`} className="text-coral font-bold">
                  {selectedEnquiry.phone}
                </a>
              </div>
              <div className="detail-meta-item">
                <span className="meta-label">Email Address</span>
                <span>{selectedEnquiry.email || "Not provided"}</span>
              </div>
              <div className="detail-meta-item">
                <span className="meta-label">City / Location</span>
                <span>{selectedEnquiry.city || "Not provided"}</span>
              </div>
              <div className="detail-meta-item">
                <span className="meta-label">Submitted On</span>
                <span>{new Date(selectedEnquiry.date).toLocaleString()}</span>
              </div>
            </div>

            <div className="detail-message-box mt-4">
              <span className="meta-label">Full Message / Requirements:</span>
              <p className="detail-message-text">{selectedEnquiry.message}</p>
            </div>

            <div className="detail-status-update mt-4">
              <span className="meta-label">Update Status:</span>
              <div className="status-buttons-row">
                {["New", "Contacted", "Converted", "Closed"].map((st) => (
                  <button
                    key={st}
                    className={`btn btn-sm ${selectedEnquiry.status === st ? "btn-primary" : "btn-outline"}`}
                    onClick={() => {
                      updateEnquiryStatus(selectedEnquiry.id, st);
                      setSelectedEnquiry({ ...selectedEnquiry, status: st });
                    }}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="modal-actions-bar">
              <button
                className="btn btn-primary btn-block"
                onClick={() => setSelectedEnquiry(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) deleteEnquiry(deleteTarget.id);
        }}
        title="Delete Enquiry?"
        message={`Delete enquiry from ${deleteTarget?.customerName}?`}
        confirmText="Delete"
      />
    </div>
  );
}
