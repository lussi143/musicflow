
import React, { useState, useRef } from 'react';
import { auth, storage } from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile,
  sendEmailVerification,
  signOut
} from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Mail, Lock, User, Camera, Sparkles, AlertCircle, ArrowRight, CheckCircle2, MailCheck, RefreshCw } from 'lucide-react';

const AuthView: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleResendEmail = async () => {
    if (!auth.currentUser) return;
    setResending(true);
    try {
      await sendEmailVerification(auth.currentUser);
      alert("Verification link resent to your inbox.");
    } catch (err: any) {
      alert("Failed to resend. Please try again later.");
    } finally {
      setResending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuggestion(null);

    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        if (!user.emailVerified) {
          setIsVerificationSent(true);
          return;
        }
      } else {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;

          await sendEmailVerification(user);

          let photoURL = '';
          if (photoFile) {
            try {
              const storageRef = ref(storage, `profiles/${user.uid}`);
              await uploadBytes(storageRef, photoFile);
              photoURL = await getDownloadURL(storageRef);
            } catch (sErr) {
              console.error("Storage error:", sErr);
            }
          }
          await updateProfile(user, {
            displayName: displayName || 'Voyager',
            photoURL: photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(displayName || 'User')}`
          });

          setIsVerificationSent(true);
        } catch (err: any) {
          if (err.code === 'auth/email-already-in-use') {
            setSuggestion("This identity is already linked. Switch to sign in.");
            setError(null);
            return;
          }
          throw err;
        }
      }
    } catch (err: any) {
      if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        setError('Incorrect email or keyphrase');
      } else if (err.code === 'auth/weak-password') {
        setError('Keyphrase too short (min 6 chars)');
      } else {
        setError(err.message || 'System interruption. Try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    setIsVerificationSent(false);
    setIsLogin(true);
    setError(null);
    setSuggestion(null);
    signOut(auth);
  };

  if (isVerificationSent) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-6 bg-[#050505] font-['Plus_Jakarta_Sans']">
        <div className="w-full max-w-[380px] z-10 animate-in fade-in zoom-in-95 duration-500">
          <div className="bg-[#0A0A0B] border border-white/5 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-[#E879F9]/10 rounded-3xl flex items-center justify-center mb-6 border border-[#E879F9]/20 shadow-[0_0_40px_rgba(232,121,249,0.15)]">
              <MailCheck className="text-[#E879F9]" size={32} />
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-4">Pending Sync</h2>
            <p className="text-zinc-400 text-sm font-medium leading-relaxed mb-8">
              We have shared an email to <span className="text-white font-bold">{email}</span>. Just verify and log in to enter the dimension.
            </p>
            
            <div className="w-full space-y-3">
              <button
                onClick={handleBackToLogin}
                className="w-full bg-white text-black py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg hover:bg-[#E879F9] hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Back to Portal <ArrowRight size={14} />
              </button>
              
              <button
                onClick={handleResendEmail}
                disabled={resending}
                className="w-full py-3 text-zinc-500 hover:text-white text-[9px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
              >
                {resending ? <RefreshCw size={12} className="animate-spin" /> : <RefreshCw size={12} />}
                Resend Link
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-[#050505] relative overflow-hidden font-['Plus_Jakarta_Sans']">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#E879F9]/5 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="w-full max-w-[360px] z-10 animate-in fade-in zoom-in-95 duration-500">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center p-2 rounded-xl bg-white/5 border border-white/10 mb-4">
            <Sparkles className="text-[#E879F9]" size={20} />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tighter uppercase">
            Music<span className="text-[#E879F9]">Flow</span>
          </h1>
          <p className="text-zinc-500 font-bold text-[8px] uppercase tracking-[0.4em] mt-1">Sonic Access Gateway</p>
        </div>

        <div className="bg-[#0A0A0B] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="flex flex-col items-center mb-4">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-14 h-14 rounded-2xl bg-white/5 border border-dashed border-white/10 flex items-center justify-center cursor-pointer overflow-hidden group hover:border-[#E879F9] transition-all"
                >
                  {photoPreview ? (
                    <img src={photoPreview} className="w-full h-full object-cover" alt="Preview" />
                  ) : (
                    <Camera size={18} className="text-zinc-600 group-hover:text-[#E879F9]" />
                  )}
                </div>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
              </div>
            )}

            {!isLogin && (
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
                <input
                  type="text"
                  required={!isLogin}
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Stage Name"
                  className="w-full bg-white/5 border border-white/5 rounded-xl pl-11 pr-4 py-3 text-white placeholder-zinc-700 focus:outline-none focus:border-[#E879F9] transition-all text-xs"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Access Point (Email)"
                className="w-full bg-white/5 border border-white/5 rounded-xl pl-11 pr-4 py-3 text-white placeholder-zinc-700 focus:outline-none focus:border-[#E879F9] transition-all text-xs"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={14} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Keyphrase"
                className="w-full bg-white/5 border border-white/5 rounded-xl pl-11 pr-4 py-3 text-white placeholder-zinc-700 focus:outline-none focus:border-[#E879F9] transition-all text-xs"
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-[10px] font-bold animate-in fade-in slide-in-from-top-1">
                <AlertCircle size={12} className="flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {suggestion && (
              <div className="p-3 bg-[#E879F9]/10 border border-[#E879F9]/20 rounded-xl animate-in fade-in slide-in-from-top-1">
                <p className="text-[#E879F9] text-[10px] font-bold text-center mb-3 leading-tight">{suggestion}</p>
                <button 
                  type="button" 
                  onClick={() => { setIsLogin(true); setSuggestion(null); setError(null); }}
                  className="w-full py-2 bg-[#E879F9] text-white rounded-lg text-[9px] uppercase font-black tracking-widest shadow-md"
                >
                  Switch to Portal
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-3.5 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg hover:bg-[#E879F9] hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
            >
              {loading ? <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" /> : (
                <>{isLogin ? 'Initiate' : 'Establish'} <ArrowRight size={12} /></>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/5 text-center">
            <button
              onClick={() => { setIsLogin(!isLogin); setError(null); setSuggestion(null); }}
              className="text-zinc-500 hover:text-white text-[8px] font-black uppercase tracking-[0.2em] transition-colors"
            >
              {isLogin ? "Generate Core ID" : "Identity Sync (Sign In)"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthView;
