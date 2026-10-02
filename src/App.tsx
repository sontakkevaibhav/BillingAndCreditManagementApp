import { useMemo, useState, type ReactNode } from "react";

type Page = "dashboard" | "billing" | "invoices" | "customers" | "credit" | "payments" | "reports" | "settings";
type IconName =
  | "grid" | "bill" | "invoice" | "users" | "credit" | "payment" | "report" | "settings"
  | "plus" | "arrowUp" | "arrowDown" | "wallet" | "search" | "chevron" | "more"
  | "bell" | "calendar" | "download" | "share" | "edit" | "trash" | "close" | "check"
  | "home" | "filter" | "phone" | "map" | "printer" | "building" | "logout";

const iconPaths: Record<IconName, ReactNode> = {
  grid: <><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></>,
  bill: <><path d="M6 2h12v20l-3-2-3 2-3-2-3 2V2Z"/><path d="M9 7h6M9 11h6M9 15h3"/></>,
  invoice: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
  credit: <><rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20M7 15h2"/></>,
  payment: <><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>,
  report: <><path d="M3 3v18h18"/><path d="m7 16 4-5 4 3 5-7"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21h-4v-.1A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3v-4h.1A1.7 1.7 0 0 0 4.6 8.6a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3h4v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.4 9c.16.38.37.73.6 1 .28.3.67.4 1.1.4h.1v4h-.1a1.7 1.7 0 0 0-1.7.6Z"/></>,
  plus: <path d="M12 5v14M5 12h14"/>, arrowUp: <path d="m18 15-6-6-6 6"/>, arrowDown: <path d="m6 9 6 6 6-6"/>,
  wallet: <><path d="M20 7V5a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h15v10a2 2 0 0 1-2 2H5a3 3 0 0 1-3-3V6"/><path d="M16 13h1"/></>,
  search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>, chevron: <path d="m9 18 6-6-6-6"/>,
  more: <><circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
  download: <><path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M4 20h16"/></>, share: <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4"/></>,
  edit: <><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/></>, trash: <><path d="M3 6h18M8 6V4h8v2M19 6l-1 15H6L5 6M10 11v6M14 11v6"/></>,
  close: <path d="m6 6 12 12M18 6 6 18"/>, check: <path d="m5 12 4 4L19 6"/>, home: <><path d="m3 11 9-8 9 8"/><path d="M5 10v11h14V10M9 21v-7h6v7"/></>,
  filter: <path d="M4 5h16M7 12h10M10 19h4"/>, phone: <path d="M22 16.9v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.1 5.18 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.62a2 2 0 0 1-.45 2.11L9 10.72a16 16 0 0 0 4.28 4.28l1.27-1.27a2 2 0 0 1 2.11-.45c.84.29 1.72.5 2.62.62A2 2 0 0 1 22 16.9Z"/>,
  map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z"/><path d="M9 3v15M15 6v15"/></>, printer: <><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></>,
  building: <><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h2M14 6h2M8 10h2M14 10h2"/></>,
  logout: <><path d="M10 17l5-5-5-5M15 12H3"/><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/></>,
};

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{iconPaths[name]}</svg>;
}

function Button({ children, variant = "primary", icon, onClick, type = "button" }: { children: ReactNode; variant?: "primary" | "secondary" | "ghost" | "danger"; icon?: IconName; onClick?: () => void; type?: "button" | "submit" }) {
  return <button type={type} className={`btn btn-${variant}`} onClick={onClick}>{icon && <Icon name={icon} size={17}/>}<span>{children}</span></button>;
}

function Badge({ children, tone = "neutral" }: { children: ReactNode; tone?: "success" | "warning" | "danger" | "neutral" | "info" }) {
  return <span className={`badge badge-${tone}`}><span className="badge-dot"/>{children}</span>;
}

function StatCard({ title, value, note, icon, tone = "brand" }: { title: string; value: string; note: string; icon: IconName; tone?: string }) {
  return <div className="card stat-card"><div className={`stat-icon tone-${tone}`}><Icon name={icon} size={20}/></div><div><p className="eyebrow">{title}</p><strong className="stat-value">{value}</strong><p className="stat-note">{note}</p></div></div>;
}

function Field({ label, children, full = false }: { label: string; children: ReactNode; full?: boolean }) {
  return <label className={`field ${full ? "field-full" : ""}`}><span>{label}</span>{children}</label>;
}

const nav: { id: Page; label: string; icon: IconName }[] = [
  { id: "dashboard", label: "Dashboard", icon: "grid" }, { id: "billing", label: "Billing", icon: "bill" },
  { id: "invoices", label: "Invoices", icon: "invoice" }, { id: "customers", label: "Customers", icon: "users" },
  { id: "credit", label: "Credit / Udhar", icon: "credit" }, { id: "payments", label: "Payments", icon: "payment" },
  { id: "reports", label: "Reports", icon: "report" }, { id: "settings", label: "Settings", icon: "settings" },
];

const transactions = [
  { customer: "Amit General Store", avatar: "AG", invoice: "INV-1048", amount: "₹12,450", paid: "₹10,000", due: "₹2,450", date: "Today, 10:24 AM", status: "Partially Paid" },
  { customer: "Shree Ram Traders", avatar: "SR", invoice: "INV-1047", amount: "₹8,200", paid: "₹8,200", due: "₹0", date: "Today, 9:15 AM", status: "Paid" },
  { customer: "Mehta Electronics", avatar: "ME", invoice: "INV-1046", amount: "₹16,800", paid: "₹0", due: "₹16,800", date: "Yesterday", status: "Unpaid" },
  { customer: "Krishna Stationery", avatar: "KS", invoice: "INV-1045", amount: "₹5,640", paid: "₹5,640", due: "₹0", date: "12 Jun 2025", status: "Paid" },
  { customer: "New India Mart", avatar: "NI", invoice: "INV-1044", amount: "₹9,850", paid: "₹4,000", due: "₹5,850", date: "11 Jun 2025", status: "Partially Paid" },
];

function Status({ value }: { value: string }) {
  const tone = value === "Paid" ? "success" : value === "Overdue" || value === "Unpaid" ? "danger" : value === "Due" ? "warning" : "info";
  return <Badge tone={tone}>{value}</Badge>;
}

function PageHeader({ title, subtitle, action }: { title: string; subtitle: string; action?: ReactNode }) {
  return <div className="page-header"><div><h1>{title}</h1><p>{subtitle}</p></div>{action && <div className="header-action">{action}</div>}</div>;
}

function Dashboard({ go, payment }: { go: (p: Page) => void; payment: () => void }) {
  return <>
    <PageHeader title="Good morning, Raj" subtitle="Here’s how your business is doing today." action={<Button icon="plus" onClick={() => go("billing")}>Create Bill</Button>}/>
    <div className="quick-actions">
      <button onClick={() => go("billing")}><span><Icon name="bill"/></span>Create Bill</button>
      <button onClick={() => go("customers")}><span><Icon name="users"/></span>Add Customer</button>
      <button onClick={payment}><span><Icon name="payment"/></span>Record Payment</button>
      <button onClick={() => go("credit")}><span><Icon name="credit"/></span>View Credit</button>
    </div>
    <div className="stats-grid">
      <StatCard title="Today's sales" value="₹48,250" note="12 invoices today" icon="arrowUp" tone="brand"/>
      <StatCard title="Today's collection" value="₹36,800" note="76% of today’s sales" icon="wallet" tone="green"/>
      <StatCard title="Outstanding credit" value="₹1,24,500" note="Across 18 customers" icon="credit" tone="amber"/>
      <StatCard title="Total customers" value="248" note="+8 this month" icon="users" tone="purple"/>
      <StatCard title="Total invoices" value="1,048" note="43 this month" icon="invoice" tone="blue"/>
      <StatCard title="Pending payments" value="23" note="6 payments overdue" icon="calendar" tone="red"/>
    </div>
    <div className="dashboard-grid">
      <section className="card chart-card">
        <div className="card-header"><div><h2>Sales & collection</h2><p>Last 7 days performance</p></div><select aria-label="Chart period"><option>This week</option><option>This month</option></select></div>
        <div className="chart-legend"><span><i className="legend-sales"/>Sales</span><span><i className="legend-collection"/>Collection</span></div>
        <div className="chart">
          <div className="y-labels"><span>₹60k</span><span>₹40k</span><span>₹20k</span><span>₹0</span></div>
          <div className="chart-area">
            <div className="grid-lines"><i/><i/><i/><i/></div>
            {[["Mon",55,40],["Tue",68,55],["Wed",48,62],["Thu",76,60],["Fri",63,48],["Sat",88,72],["Sun",70,58]].map(([day,a,b]) => <div className="bar-group" key={day}><div className="bars"><i className="bar-sales" style={{height:`${a}%`}}/><i className="bar-collection" style={{height:`${b}%`}}/></div><span>{day}</span></div>)}
          </div>
        </div>
      </section>
      <section className="card overview-card">
        <div className="card-header"><div><h2>Credit overview</h2><p>Current receivables</p></div><button className="icon-btn"><Icon name="more"/></button></div>
        <div className="donut-wrap"><div className="donut"><div><strong>₹1.24L</strong><span>Total credit</span></div></div></div>
        <div className="credit-legend"><div><span><i className="dot green"/>Collected</span><strong>₹3.8L</strong></div><div><span><i className="dot amber"/>Due soon</span><strong>₹86.2K</strong></div><div><span><i className="dot red"/>Overdue</span><strong>₹38.3K</strong></div></div>
      </section>
    </div>
    <TransactionTable title="Recent transactions" subtitle="Your latest billing activity" rows={transactions} onViewAll={() => go("invoices")}/>
  </>;
}

function TransactionTable({ title, subtitle, rows, onViewAll }: { title: string; subtitle: string; rows: typeof transactions; onViewAll?: () => void }) {
  return <section className="card table-card">
    <div className="card-header"><div><h2>{title}</h2><p>{subtitle}</p></div>{onViewAll && <button className="text-btn" onClick={onViewAll}>View all <Icon name="chevron" size={15}/></button>}</div>
    <div className="table-wrap"><table><thead><tr><th>Customer</th><th>Invoice no.</th><th>Amount</th><th>Paid</th><th>Outstanding</th><th>Date</th><th>Status</th><th/></tr></thead>
      <tbody>{rows.map(r => <tr key={r.invoice}><td><div className="customer-cell"><span className="avatar">{r.avatar}</span><strong>{r.customer}</strong></div></td><td><span className="invoice-id">{r.invoice}</span></td><td>{r.amount}</td><td className="positive">{r.paid}</td><td className={r.due !== "₹0" ? "negative" : ""}>{r.due}</td><td className="muted">{r.date}</td><td><Status value={r.status}/></td><td><button className="icon-btn"><Icon name="more"/></button></td></tr>)}</tbody>
    </table></div>
    <div className="mobile-list">{rows.slice(0,4).map(r => <div className="mobile-row" key={r.invoice}><span className="avatar">{r.avatar}</span><div><strong>{r.customer}</strong><small>{r.invoice} · {r.date}</small></div><div className="mobile-amount"><strong>{r.amount}</strong><Status value={r.status}/></div></div>)}</div>
  </section>;
}

function Billing({ done }: { done: () => void }) {
  const [items, setItems] = useState([{ id: 1, name: "Premium Basmati Rice (25 kg)", qty: 2, rate: 2150, tax: 5 }]);
  const total = items.reduce((s, i) => s + i.qty * i.rate, 0);
  return <>
    <PageHeader title="Create new bill" subtitle="Make an invoice in under a minute." action={<span className="draft-pill">Draft saved</span>}/>
    <div className="billing-layout">
      <div className="billing-main">
        <section className="card form-card">
          <div className="section-title"><span>1</span><div><h2>Customer details</h2><p>Who is this bill for?</p></div></div>
          <div className="form-grid">
            <Field label="Select customer" full><div className="input-with-icon"><Icon name="search"/><input defaultValue="Amit General Store" aria-label="Select customer"/><button><Icon name="chevron"/></button></div></Field>
            <Field label="Invoice number"><input defaultValue="INV-1049"/></Field>
            <Field label="Invoice date"><div className="input-with-icon"><Icon name="calendar"/><input type="date" defaultValue="2025-06-14"/></div></Field>
          </div>
        </section>
        <section className="card form-card">
          <div className="section-title"><span>2</span><div><h2>Items</h2><p>Add products or services to this bill.</p></div></div>
          <div className="items-head"><span>Product / service</span><span>Qty</span><span>Rate</span><span>Tax</span><span>Amount</span><span/></div>
          {items.map((item, idx) => <div className="item-row" key={item.id}>
            <div><label>Product / service</label><input value={item.name} onChange={e => setItems(items.map((it,i) => i === idx ? {...it,name:e.target.value}:it))}/></div>
            <div><label>Qty</label><input type="number" value={item.qty} onChange={e => setItems(items.map((it,i) => i === idx ? {...it,qty:+e.target.value}:it))}/></div>
            <div><label>Rate</label><input type="number" value={item.rate} onChange={e => setItems(items.map((it,i) => i === idx ? {...it,rate:+e.target.value}:it))}/></div>
            <div><label>Tax</label><select value={item.tax} onChange={e => setItems(items.map((it,i) => i === idx ? {...it,tax:+e.target.value}:it))}><option value="0">0%</option><option value="5">5%</option><option value="12">12%</option><option value="18">18%</option></select></div>
            <strong>₹{(item.qty*item.rate).toLocaleString("en-IN")}</strong>
            <button className="icon-btn danger-icon" onClick={() => setItems(items.filter((_,i) => i !== idx))}><Icon name="trash"/></button>
          </div>)}
          <button className="add-line" onClick={() => setItems([...items,{id:Date.now(),name:"",qty:1,rate:0,tax:5}])}><Icon name="plus"/> Add another item</button>
        </section>
        <section className="card form-card">
          <div className="section-title"><span>3</span><div><h2>Payment</h2><p>Record an initial payment, if any.</p></div></div>
          <div className="form-grid three"><Field label="Amount paid"><input defaultValue="2000"/></Field><Field label="Payment method"><select><option>Cash</option><option>UPI</option><option>Bank Transfer</option><option>Card</option></select></Field><Field label="Notes"><input placeholder="Optional note"/></Field></div>
        </section>
      </div>
      <aside className="card invoice-summary">
        <h2>Invoice summary</h2><div className="summary-line"><span>Subtotal</span><strong>₹{total.toLocaleString("en-IN")}</strong></div><div className="summary-line"><span>Discount</span><button>+ Add discount</button></div><div className="summary-line"><span>Tax (5%)</span><strong>₹{Math.round(total*.05).toLocaleString("en-IN")}</strong></div><div className="summary-total"><span>Grand total</span><strong>₹{Math.round(total*1.05).toLocaleString("en-IN")}</strong></div><div className="summary-line paid"><span>Amount paid</span><strong>₹2,000</strong></div><div className="balance-box"><span>Balance due</span><strong>₹{Math.max(0,Math.round(total*1.05)-2000).toLocaleString("en-IN")}</strong></div>
        <Button icon="check" onClick={done}>Save & Share</Button><Button variant="secondary" icon="printer">Save & Print</Button><button className="save-link">Save as draft</button>
      </aside>
    </div>
  </>;
}

function Invoices() {
  const [filter, setFilter] = useState("All");
  const rows = filter === "All" ? transactions : transactions.filter(r => r.status === filter);
  return <>
    <PageHeader title="Invoices" subtitle="View, track and manage every invoice." action={<Button icon="plus">Create Invoice</Button>}/>
    <div className="toolbar card"><div className="search-box"><Icon name="search"/><input placeholder="Search invoice or customer..."/></div><div className="filter-tabs">{["All","Paid","Partially Paid","Unpaid"].map(f => <button className={filter===f?"active":""} onClick={() => setFilter(f)} key={f}>{f}</button>)}</div><Button variant="secondary" icon="calendar">Date range</Button><Button variant="secondary" icon="filter">Filters</Button></div>
    <TransactionTable title="All invoices" subtitle={`${rows.length} invoices shown`} rows={rows}/>
    <div className="pagination"><span>Showing 1–5 of 1,048</span><div><button disabled>Previous</button><button className="active">1</button><button>2</button><button>3</button><button>Next</button></div></div>
  </>;
}

const customers = [
  {name:"Amit General Store", initials:"AG", phone:"+91 98765 43210", purchase:"₹84,250", paid:"₹67,800", due:"₹16,450", last:"Today"},
  {name:"Shree Ram Traders", initials:"SR", phone:"+91 98202 61455", purchase:"₹1,28,900", paid:"₹1,28,900", due:"₹0", last:"Today"},
  {name:"Mehta Electronics", initials:"ME", phone:"+91 99674 81230", purchase:"₹56,800", paid:"₹32,000", due:"₹24,800", last:"Yesterday"},
  {name:"Krishna Stationery", initials:"KS", phone:"+91 98191 33882", purchase:"₹42,640", paid:"₹38,640", due:"₹4,000", last:"12 Jun 2025"},
];

function Customers({ payment }: { payment: () => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  if (selected !== null) return <CustomerDetail customer={customers[selected]} back={() => setSelected(null)} payment={payment}/>;
  return <>
    <PageHeader title="Customers" subtitle="Manage customer details, purchases and credit." action={<Button icon="plus">Add Customer</Button>}/>
    <div className="toolbar card"><div className="search-box"><Icon name="search"/><input placeholder="Search by name or mobile..."/></div><Button variant="secondary" icon="filter">Filter</Button></div>
    <section className="card table-card customer-table"><div className="table-wrap"><table><thead><tr><th>Customer</th><th>Mobile number</th><th>Total purchases</th><th>Total paid</th><th>Outstanding</th><th>Last transaction</th><th>Actions</th></tr></thead><tbody>
      {customers.map((c,i) => <tr key={c.name}><td><button className="customer-cell link-cell" onClick={() => setSelected(i)}><span className="avatar">{c.initials}</span><strong>{c.name}</strong></button></td><td className="muted">{c.phone}</td><td>{c.purchase}</td><td className="positive">{c.paid}</td><td className={c.due!=="₹0"?"negative":""}><strong>{c.due}</strong></td><td className="muted">{c.last}</td><td><div className="row-actions"><button title="Record payment" onClick={payment}><Icon name="payment"/></button><button title="Edit"><Icon name="edit"/></button><button title="More"><Icon name="more"/></button></div></td></tr>)}
    </tbody></table></div>
    <div className="customer-cards">{customers.map((c,i) => <button className="customer-card" key={c.name} onClick={() => setSelected(i)}><span className="avatar">{c.initials}</span><div><strong>{c.name}</strong><small>{c.phone}</small><span>Outstanding <b>{c.due}</b></span></div><Icon name="chevron"/></button>)}</div></section>
  </>;
}

function CustomerDetail({ customer, back, payment }: { customer: typeof customers[number]; back: () => void; payment: () => void }) {
  return <>
    <button className="back-link" onClick={back}><Icon name="chevron"/> Back to customers</button>
    <section className="profile-card card"><div className="profile-main"><span className="avatar avatar-large">{customer.initials}</span><div><h1>{customer.name}</h1><p><Icon name="phone" size={15}/>{customer.phone}<span>•</span><Icon name="map" size={15}/>MG Road, Pune, Maharashtra</p></div></div><div className="profile-due"><span>Current outstanding</span><strong>{customer.due}</strong></div></section>
    <div className="profile-actions"><Button icon="plus">Create Bill</Button><Button variant="secondary" icon="payment" onClick={payment}>Record Payment</Button><Button variant="secondary" icon="share">Share Statement</Button></div>
    <div className="stats-grid three-cols"><StatCard title="Total billed" value={customer.purchase} note="42 invoices" icon="invoice"/><StatCard title="Total paid" value={customer.paid} note="80% collected" icon="check" tone="green"/><StatCard title="Outstanding" value={customer.due} note="Payment due in 6 days" icon="wallet" tone="amber"/></div>
    <section className="card table-card"><div className="card-header"><div><h2>Transaction ledger</h2><p>Complete account activity</p></div><Button variant="secondary" icon="download">Download</Button></div><div className="table-wrap"><table><thead><tr><th>Date</th><th>Description</th><th>Debit</th><th>Credit</th><th>Balance</th></tr></thead><tbody>
      <tr><td>14 Jun 2025</td><td><strong>Invoice #INV-1048</strong><small className="block">Sale</small></td><td className="negative">₹12,450</td><td>—</td><td><strong>₹16,450</strong></td></tr>
      <tr><td>10 Jun 2025</td><td><strong>Payment received</strong><small className="block">UPI</small></td><td>—</td><td className="positive">₹8,000</td><td><strong>₹4,000</strong></td></tr>
      <tr><td>04 Jun 2025</td><td><strong>Invoice #INV-1012</strong><small className="block">Sale</small></td><td className="negative">₹4,000</td><td>—</td><td><strong>₹12,000</strong></td></tr>
    </tbody></table></div></section>
  </>;
}

const credits = [
  {name:"Mehta Electronics", amount:"₹56,800", paid:"₹32,000", due:"₹24,800", date:"08 Jun 2025", status:"Overdue"},
  {name:"Amit General Store", amount:"₹24,450", paid:"₹8,000", due:"₹16,450", date:"20 Jun 2025", status:"Due"},
  {name:"New India Mart", amount:"₹19,850", paid:"₹14,000", due:"₹5,850", date:"22 Jun 2025", status:"Partially Paid"},
  {name:"Krishna Stationery", amount:"₹12,640", paid:"₹8,640", due:"₹4,000", date:"28 Jun 2025", status:"Partially Paid"},
  {name:"Shree Ram Traders", amount:"₹18,200", paid:"₹18,200", due:"₹0", date:"10 Jun 2025", status:"Paid"},
];

function Credit({ payment }: { payment: () => void }) {
  return <>
    <PageHeader title="Credit / Udhar" subtitle="Track money owed and collect payments on time." action={<Button icon="payment" onClick={payment}>Record Payment</Button>}/>
    <div className="stats-grid four-cols"><StatCard title="Total credit given" value="₹5,06,400" note="This financial year" icon="credit"/><StatCard title="Total collected" value="₹3,81,900" note="75.4% collected" icon="check" tone="green"/><StatCard title="Total outstanding" value="₹1,24,500" note="Across 18 customers" icon="wallet" tone="amber"/><StatCard title="Overdue amount" value="₹38,300" note="6 customers overdue" icon="calendar" tone="red"/></div>
    <section className="card table-card"><div className="card-header"><div><h2>Customer credit</h2><p>All outstanding balances and due dates</p></div><div className="search-box compact"><Icon name="search"/><input placeholder="Search customer"/></div></div><div className="table-wrap"><table><thead><tr><th>Customer</th><th>Credit amount</th><th>Paid</th><th>Outstanding</th><th>Due date</th><th>Status</th><th/></tr></thead><tbody>
      {credits.map((c,i) => <tr key={c.name}><td><div className="customer-cell"><span className="avatar">{c.name.split(" ").map(n=>n[0]).slice(0,2).join("")}</span><strong>{c.name}</strong></div></td><td>{c.amount}</td><td className="positive">{c.paid}</td><td className="outstanding">{c.due}</td><td>{c.date}</td><td><Status value={c.status}/></td><td>{c.status!=="Paid" && <button className="pay-now" onClick={payment}>Record payment</button>}</td></tr>)}
    </tbody></table></div></section>
  </>;
}

function Payments({ open }: { open: () => void }) {
  return <>
    <PageHeader title="Payments" subtitle="All collections received from customers." action={<Button icon="plus" onClick={open}>Record Payment</Button>}/>
    <div className="stats-grid three-cols"><StatCard title="Collected today" value="₹36,800" note="8 payments" icon="wallet" tone="green"/><StatCard title="This month" value="₹3,81,900" note="+12.4% from last month" icon="arrowUp"/><StatCard title="Pending collection" value="₹1,24,500" note="18 customer accounts" icon="credit" tone="amber"/></div>
    <section className="card table-card"><div className="card-header"><div><h2>Payment history</h2><p>Recent incoming payments</p></div><Button variant="secondary" icon="download">Export</Button></div><div className="table-wrap"><table><thead><tr><th>Payment ID</th><th>Customer</th><th>Date</th><th>Method</th><th>Reference</th><th>Amount</th><th/></tr></thead><tbody>
      {[["PAY-0381","Amit General Store","Today, 10:24 AM","UPI","UPI783920","₹8,000"],["PAY-0380","Shree Ram Traders","Today, 9:15 AM","Cash","—","₹8,200"],["PAY-0379","Krishna Stationery","Yesterday","Bank Transfer","UTR6382081","₹5,640"],["PAY-0378","New India Mart","11 Jun 2025","Card","CARD •• 3421","₹4,000"]].map(r=><tr key={r[0]}><td className="invoice-id">{r[0]}</td><td><strong>{r[1]}</strong></td><td className="muted">{r[2]}</td><td><Badge>{r[3]}</Badge></td><td className="muted">{r[4]}</td><td className="positive"><strong>{r[5]}</strong></td><td><button className="icon-btn"><Icon name="more"/></button></td></tr>)}
    </tbody></table></div></section>
  </>;
}

function Reports() {
  const reports = [
    ["Sales Report","Track total sales, taxes and invoice trends.","invoice","Updated today"],
    ["Collection Report","Review payments received by date and method.","payment","Updated today"],
    ["Outstanding Credit","See unpaid and overdue customer balances.","credit","18 customers"],
    ["Customer Ledger","Detailed debit and credit history by customer.","users","248 ledgers"],
    ["Payment History","Complete payment log with references.","wallet","381 payments"],
  ] as const;
  return <>
    <PageHeader title="Reports" subtitle="Understand your business with simple reports."/>
    <div className="report-filters card"><Field label="Date range"><select><option>This month</option><option>Last month</option><option>Custom range</option></select></Field><Field label="Customer"><select><option>All customers</option><option>Amit General Store</option></select></Field><div className="report-actions"><Button variant="secondary" icon="download">Export Excel</Button><Button icon="download">Export PDF</Button></div></div>
    <div className="report-grid">{reports.map(([title,desc,icon,meta]) => <button className="card report-card" key={title}><span className="report-icon"><Icon name={icon}/></span><div><h2>{title}</h2><p>{desc}</p><small>{meta}</small></div><Icon name="chevron"/></button>)}</div>
    <section className="card report-preview"><div className="card-header"><div><h2>Sales summary</h2><p>1–14 June 2025</p></div><Badge tone="success">Up 12.4%</Badge></div><div className="report-numbers"><div><span>Gross sales</span><strong>₹4,86,400</strong></div><div><span>Discounts</span><strong>₹12,240</strong></div><div><span>Tax collected</span><strong>₹42,680</strong></div><div><span>Net sales</span><strong>₹4,74,160</strong></div></div></section>
  </>;
}

function Settings() {
  const sections = [
    ["Business Profile","Business name, address and GST details","building"],["Invoice Settings","Numbering, terms and invoice appearance","invoice"],["Tax Settings","GST rates and tax preferences","report"],["Payment Methods","Cash, UPI and bank details","credit"],["User Profile","Name, mobile and password","users"],["Notification Settings","Payment reminders and alerts","bell"],["Backup & Restore","Keep your business data protected","download"],["Logout","Sign out from this device","logout"],
  ] as const;
  return <>
    <PageHeader title="Settings" subtitle="Manage your business and app preferences."/>
    <section className="settings-profile card"><span className="business-mark">RM</span><div><h2>Rajesh Mini Mart</h2><p>GSTIN: 27ABCDE1234F1Z5 · Pune, Maharashtra</p></div><Button variant="secondary" icon="edit">Edit profile</Button></section>
    <div className="settings-list card">{sections.map(([title,desc,icon]) => <button className={title==="Logout"?"logout-row":""} key={title}><span className="settings-icon"><Icon name={icon}/></span><div><strong>{title}</strong><small>{desc}</small></div><Icon name="chevron"/></button>)}</div>
  </>;
}

function PaymentModal({ close }: { close: () => void }) {
  const [amount, setAmount] = useState("8000");
  const remaining = Math.max(0,16450-(Number(amount)||0));
  return <div className="modal-backdrop" onMouseDown={e => e.target===e.currentTarget&&close()}>
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="payment-title">
      <div className="modal-header"><div><h2 id="payment-title">Record payment</h2><p>Add a payment received from a customer.</p></div><button className="icon-btn" onClick={close}><Icon name="close"/></button></div>
      <div className="modal-body"><Field label="Customer" full><div className="input-with-icon"><Icon name="search"/><input defaultValue="Amit General Store"/></div></Field>
        <div className="outstanding-banner"><span>Outstanding amount</span><strong>₹16,450</strong></div>
        <div className="form-grid"><Field label="Payment amount"><input autoFocus value={amount} onChange={e=>setAmount(e.target.value)}/></Field><Field label="Payment date"><input type="date" defaultValue="2025-06-14"/></Field><Field label="Payment method"><select><option>UPI</option><option>Cash</option><option>Bank Transfer</option><option>Card</option><option>Other</option></select></Field><Field label="Notes"><input placeholder="Reference or note"/></Field></div>
        <div className="balance-flow"><div><span>Previous balance</span><strong>₹16,450</strong></div><Icon name="chevron"/><div><span>Payment</span><strong className="positive">− ₹{(Number(amount)||0).toLocaleString("en-IN")}</strong></div><Icon name="chevron"/><div><span>Remaining</span><strong>₹{remaining.toLocaleString("en-IN")}</strong></div></div>
      </div>
      <div className="modal-footer"><Button variant="secondary" onClick={close}>Cancel</Button><Button icon="check" onClick={close}>Save Payment</Button></div>
    </div>
  </div>;
}

export default function App() {
  const [page, setPage] = useState<Page>("dashboard");
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [toast, setToast] = useState("");
  const pageTitle = useMemo(() => nav.find(n => n.id === page)?.label ?? "", [page]);
  const go = (p: Page) => { setPage(p); window.scrollTo({top:0,behavior:"smooth"}); };
  const saved = () => { go("invoices"); setToast("Invoice INV-1049 saved and ready to share"); window.setTimeout(()=>setToast(""),3500); };
  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark"><Icon name="bill" size={21}/></span><span><strong>Ledgerly</strong><small>Billing made simple</small></span></div>
      <nav>{nav.map(n => <button key={n.id} onClick={() => go(n.id)} className={page===n.id?"active":""}><Icon name={n.icon}/><span>{n.label}</span>{n.id==="credit"&&<i>6</i>}</button>)}</nav>
      <div className="sidebar-help"><span><Icon name="phone"/></span><strong>Need help?</strong><p>Call us at 1800-123-4455</p><button>Contact support</button></div>
      <div className="user-card"><span className="avatar">RK</span><div><strong>Rajesh Kumar</strong><small>Rajesh Mini Mart</small></div><Icon name="more"/></div>
    </aside>
    <main>
      <header className="topbar"><div className="mobile-brand"><span className="brand-mark"><Icon name="bill" size={19}/></span><strong>Ledgerly</strong></div><div className="breadcrumb"><span>Workspace</span><Icon name="chevron" size={13}/><strong>{pageTitle}</strong></div><div className="top-actions"><button className="icon-btn notification"><Icon name="bell"/><i/></button><button className="avatar">RK</button></div></header>
      <div className="content">
        {page==="dashboard"&&<Dashboard go={go} payment={()=>setPaymentOpen(true)}/>}
        {page==="billing"&&<Billing done={saved}/>}
        {page==="invoices"&&<Invoices/>}
        {page==="customers"&&<Customers payment={()=>setPaymentOpen(true)}/>}
        {page==="credit"&&<Credit payment={()=>setPaymentOpen(true)}/>}
        {page==="payments"&&<Payments open={()=>setPaymentOpen(true)}/>}
        {page==="reports"&&<Reports/>}
        {page==="settings"&&<Settings/>}
      </div>
    </main>
    <nav className="mobile-nav">
      {[{id:"dashboard",label:"Home",icon:"home"},{id:"billing",label:"Billing",icon:"bill"},{id:"customers",label:"Customers",icon:"users"},{id:"credit",label:"Credit",icon:"credit"},{id:"settings",label:"More",icon:"more"}].map(n=><button key={n.id} className={page===n.id?"active":""} onClick={()=>go(n.id as Page)}><Icon name={n.icon as IconName}/><span>{n.label}</span></button>)}
    </nav>
    {paymentOpen&&<PaymentModal close={()=>setPaymentOpen(false)}/>}
    {toast&&<div className="toast"><span><Icon name="check"/></span>{toast}</div>}
  </div>;
}
