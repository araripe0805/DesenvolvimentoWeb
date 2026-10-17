import { useEffect, useId, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';

export function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const container = useRef(null);
  const trigger = useRef(null);
  const menuId = useId();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const prefix = pathname.startsWith('/admin') ? '/admin' : '';
  useEffect(() => {
    if (!open) return;
    function closeOutside(event) {
      if (!container.current?.contains(event.target)) setOpen(false);
    }
    function closeWithEscape(event) {
      if (event.key === 'Escape') {
        setOpen(false);
        trigger.current?.focus();
      }
    }
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', closeWithEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('keydown', closeWithEscape);
    };
  }, [open]);
  return <div className="profile-menu" ref={container} onBlur={(event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
  }}>
    <button type="button" className="profile-section" ref={trigger}
      aria-expanded={open} aria-controls={menuId} onClick={() => setOpen(!open)}>
      <span className="profile-avatar"><User size={28} color="#333" /></span>
      <span className="profile-text">Meu perfil</span>
    </button>
    {open && <div className="profile-dropdown" id={menuId}>
      <Link to={`${prefix}/perfil`} onClick={() => setOpen(false)}><User size={18} /> Visualizar perfil</Link>
      <button type="button" onClick={() => { setOpen(false); navigate('/login', { replace: true }); }}>
        <LogOut size={18} /> Sair da conta
      </button>
    </div>}
  </div>;
}
