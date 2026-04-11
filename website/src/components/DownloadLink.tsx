import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

interface DownloadLinkProps {
  href: string;
  filename?: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Download link component that forces file download instead of navigation.
 * Works for .md and other text files that browsers might try to render.
 */
export default function DownloadLink({ 
  href, 
  filename, 
  children,
  className 
}: DownloadLinkProps): JSX.Element {
  const resolvedHref = useBaseUrl(href);

  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    try {
      // Fetch the file content
      const response = await fetch(resolvedHref);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }
      
      const blob = await response.blob();
      
      // Extract filename from href if not provided
      const downloadFilename = filename || resolvedHref.split('/').pop() || 'download';
      
      // Create a temporary URL for the blob
      const blobUrl = window.URL.createObjectURL(blob);
      
      // Create a temporary anchor element and trigger download
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = downloadFilename;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback: try opening in new tab
      window.open(resolvedHref, '_blank');
    }
  };

  return (
    <a 
      href={resolvedHref} 
      onClick={handleDownload}
      className={className}
    >
      {children}
    </a>
  );
}
