'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { projects as local } from '@/data/projects';
import { getProjects } from '@/lib/firebase/firestore';
import type { Project } from '@/types';
import { Icon } from '@/components/ui/icons';
export function ProjectCatalog(){const [items,setItems]=useState<Project[]>(local);useEffect(()=>{void getProjects().then(setItems);},[]);return <div className="grid-3">{items.map((p,i)=><Link href={`/projects/${p.slug}`} key={p.id} className="card hover-card project-card"><div className="project-card-top"><div className="feature-icon"><Icon name={i%2?'leaf':'flask'}/></div><span className="project-no">{String(i+1).padStart(2,'0')}</span></div><span className="pill pill-cyan">{p.grade} сынып</span><h2>{p.title}</h2><p>{p.description}</p><div className="meta"><span>{p.difficulty}</span><span>{p.duration}</span></div><span className="button-link">Жобаны ашу <Icon name="arrow" size={17}/></span></Link>)}<style>{`.project-card{padding:26px;min-height:310px;display:flex;flex-direction:column}.project-card-top{display:flex;justify-content:space-between}.project-no{color:#b3bfd1;font-size:12px;font-weight:800}.project-card .feature-icon{margin-bottom:18px}.project-card h2{font-size:22px;margin:14px 0 8px}.project-card p{font-size:13px;flex:1}.project-card .meta{margin:16px 0}.project-card .button-link{font-size:13px}`}</style></div>}
