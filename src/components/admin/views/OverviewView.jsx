import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../../context/AppContext";
import { INITIAL_ANALYTICS } from "../../../data/seedData";
import {
  Store,
  BookOpen,
  UtensilsCrossed,
  QrCode,
  Eye,
  CreditCard,
  Plus,
  ArrowUpRight,
  TrendingUp,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight
} from "lucide-react";

export default function OverviewView({
  setActiveView,
  onOpenAddRestaurant,
  onSelectQR
}) {
  const { restaurants, stats } = useApp();

  const origin = typeof window !== "undefined" ? window.location.origin : "";

  return (
    <div className="admin-view-content overview-view">
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="welcome-text">
          <div className="welcome-eyebrow">
            <span className="badge-dot" />
            <span>DINEEQR COMMAND CENTER</span>
          </div>
          <h2 className="welcome-title">
            Welcome back, Black Cardinal.
          </h2>
          <p className="welcome-desc">
            Monitor restaurant onboarding, digital menu updates, QR scan views, and active subscriptions across your platform.
          </p>
          <div className="welcome-actions">
            <button className="btn btn-primary" onClick={onOpenAddRestaurant}>
              <Plus size={16} /> Add New Restaurant
            </button>
            <button className="btn btn-outline-white" onClick={() => setActiveView("qrcodes")}>
              <QrCode size={16} /> QR Management
            </button>
          </div>
        </div>

        <div className="welcome-graphic desktop-only">
          <div className="welcome-qr-preview">
            <div className="qr-mini-badge">DineEQR</div>
            <div className="qr-fake-dots">
              <QrCode size={70} />
            </div>
            <span>Scan. Explore. Order.</span>
          </div>
        </div>
      </div>

      {/* Metrics Row - 6 Cards */}
      <div className="metrics-grid-6">
        <div className="metric-card" onClick={() => setActiveView("restaurants")}>
          <div className="metric-header">
            <span className="metric-label">TOTAL RESTAURANTS</span>
            <div className="metric-icon-box bg-coral-subtle"><Store size={18} /></div>
          </div>
          <div className="metric-value">{stats.totalRestaurants}</div>
          <div className="metric-sub">{stats.activeRestaurants} active profiles</div>
        </div>

        <div className="metric-card" onClick={() => setActiveView("menus")}>
          <div className="metric-header">
            <span className="metric-label">ACTIVE MENUS</span>
            <div className="metric-icon-box bg-orange-subtle"><BookOpen size={18} /></div>
          </div>
          <div className="metric-value">{stats.activeRestaurants}</div>
          <div className="metric-sub">Published to live URLs</div>
        </div>

        <div className="metric-card" onClick={() => setActiveView("items")}>
          <div className="metric-header">
            <span className="metric-label">TOTAL MENU ITEMS</span>
            <div className="metric-icon-box bg-yellow-subtle"><UtensilsCrossed size={18} /></div>
          </div>
          <div className="metric-value">{stats.totalItems}</div>
          <div className="metric-sub">Across all restaurant menus</div>
        </div>

        <div className="metric-card" onClick={() => setActiveView("qrcodes")}>
          <div className="metric-header">
            <span className="metric-label">QR CODES GENERATED</span>
            <div className="metric-icon-box bg-green-subtle"><QrCode size={18} /></div>
          </div>
          <div className="metric-value">{stats.totalRestaurants}</div>
          <div className="metric-sub">PNG & SVG ready to print</div>
        </div>

        <div className="metric-card" onClick={() => setActiveView("analytics")}>
          <div className="metric-header">
            <span className="metric-label">TOTAL MENU VIEWS</span>
            <div className="metric-icon-box bg-purple-subtle"><Eye size={18} /></div>
          </div>
          <div className="metric-value">{stats.totalViews.toLocaleString()}</div>
          <div className="metric-sub">Tracked customer menu visits</div>
        </div>

        <div className="metric-card" onClick={() => setActiveView("subscriptions")}>
          <div className="metric-header">
            <span className="metric-label">ACTIVE SUBSCRIPTIONS</span>
            <div className="metric-icon-box bg-blue-subtle"><CreditCard size={18} /></div>
          </div>
          <div className="metric-value">{stats.activeSubscriptions}</div>
          <div className="metric-sub">Monthly & Trial accounts</div>
        </div>
      </div>

      {/* Two Column Layout: Charts + Quick Actions */}
      <div className="admin-grid-2-col">
        {/* Menu Views Chart Card */}
        <div className="dashboard-card">
          <div className="card-header-row">
            <div>
              <h3 className="card-title">Menu Page Views (Last 7 Days)</h3>
              <p className="card-sub">Accurate customer menu requests tracked per day</p>
            </div>
            <span className="trend-badge positive">
              <TrendingUp size={14} /> +24% this week
            </span>
          </div>

          <div className="chart-bars-wrap">
            {INITIAL_ANALYTICS.dailyViews.map((item) => {
              const maxVal = 1000;
              const barHeightPct = Math.round((item.views / maxVal) * 100);

              return (
                <div key={item.day} className="chart-bar-col">
                  <span className="chart-bar-val">{item.views}</span>
                  <div className="chart-bar-track">
                    <div
                      className="chart-bar-fill"
                      style={{ height: `${barHeightPct}%` }}
                      title={`${item.views} views on ${item.day}`}
                    />
                  </div>
                  <span className="chart-bar-label">{item.day}</span>
                </div>
              );
            })}
          </div>

          <div className="chart-footnote">
            <span className="dot-green" /> Live customer menu page views (excludes internal admin previews).
          </div>
        </div>

        {/* Quick Actions & Launch Status */}
        <div className="dashboard-card">
          <div className="card-header-row">
            <div>
              <h3 className="card-title">Quick Actions & Shortcuts</h3>
              <p className="card-sub">Fast operations for restaurant staff</p>
            </div>
          </div>

          <div className="quick-actions-list">
            <button
              className="quick-action-item"
              onClick={onOpenAddRestaurant}
            >
              <div className="action-item-icon"><Plus size={18} /></div>
              <div className="action-item-text">
                <strong>Create Restaurant Profile</strong>
                <span>Add branding, opening hours and location</span>
              </div>
              <ChevronRight size={16} className="action-arrow" />
            </button>

            <button
              className="quick-action-item"
              onClick={() => setActiveView("items")}
            >
              <div className="action-item-icon"><UtensilsCrossed size={18} /></div>
              <div className="action-item-text">
                <strong>Manage Dishes & Pricing</strong>
                <span>Add new dishes or mark items unavailable</span>
              </div>
              <ChevronRight size={16} className="action-arrow" />
            </button>

            <button
              className="quick-action-item"
              onClick={() => setActiveView("qrcodes")}
            >
              <div className="action-item-icon"><QrCode size={18} /></div>
              <div className="action-item-text">
                <strong>Download Printable QR Code</strong>
                <span>PNG & SVG high-res files for table stands</span>
              </div>
              <ChevronRight size={16} className="action-arrow" />
            </button>

            <button
              className="quick-action-item"
              onClick={() => setActiveView("templates")}
            >
              <div className="action-item-icon"><Sparkles size={18} /></div>
              <div className="action-item-text">
                <strong>Change Menu Design Template</strong>
                <span>Switch between 8 curated restaurant styles</span>
              </div>
              <ChevronRight size={16} className="action-arrow" />
            </button>
          </div>
        </div>
      </div>

      {/* Recent Restaurants Table */}
      <div className="dashboard-card mt-6">
        <div className="card-header-row">
          <div>
            <h3 className="card-title">Recent Restaurant Profiles</h3>
            <p className="card-sub">All restaurants currently hosted on your DineEQR platform</p>
          </div>
          <button className="btn btn-outline btn-sm" onClick={() => setActiveView("restaurants")}>
            View All ({restaurants.length})
          </button>
        </div>

        <div className="table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Restaurant</th>
                <th>Cuisine & Template</th>
                <th>Menu URL</th>
                <th>Items</th>
                <th>Views</th>
                <th>Subscription</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((r) => (
                <tr key={r.id}>
                  <td>
                    <div className="table-rest-cell">
                      <span className="rest-avatar-sm">{r.logo || "🍽️"}</span>
                      <div>
                        <strong>{r.name}</strong>
                        <small>{r.city || "Location not set"}</small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="table-cuisine-cell">
                      <span>{r.category}</span>
                      <small className="template-tag-sm">{r.templateId || "Standard"}</small>
                    </div>
                  </td>
                  <td>
                    <a
                      href={`${origin}/menu/${r.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      className="table-link-cell"
                      title="Open live customer menu"
                    >
                      /menu/{r.slug} <ExternalLink size={12} />
                    </a>
                  </td>
                  <td>
                    <span className="items-count-badge">{(r.items || []).length} items</span>
                  </td>
                  <td>
                    <strong>{(r.viewsCount || 0).toLocaleString()}</strong>
                  </td>
                  <td>
                    <span className={`status-badge-sm ${r.subscription?.status === "active" ? "status-active" : "status-trial"}`}>
                      {r.subscription?.planName || "Trial"}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions-cell">
                      <button
                        className="btn-icon-table"
                        onClick={() => onSelectQR(r)}
                        title="View / Print QR Code"
                      >
                        <QrCode size={15} />
                      </button>
                      <button
                        className="btn-icon-table"
                        onClick={() => setActiveView("menus")}
                        title="Manage Menu"
                      >
                        <BookOpen size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
