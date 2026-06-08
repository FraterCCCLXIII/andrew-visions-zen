import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AudioPlayer } from "@/components/AudioPlayer";
import { trackTrackPageView } from "@/lib/analytics";

// Track data mapping
const trackData = [
  { title: "What is Ego Death", slug: "what-is-ego-death", duration: 0 },
  { title: "What is Nonduality", slug: "what-is-non-duality", duration: 0 },
  { title: "The Four Selves", slug: "the-four-selves", duration: 0 },
  { title: "Realization and Transformation", slug: "realisation-and-transformation", duration: 0 },
  { title: "The Evolution of Nonduality", slug: "the-evolution-of-nonduality", duration: 0 },
  { title: "The Edge of Evolution", slug: "the-edge-of-evolution", duration: 0 },
  { title: "Realigning the Soul", slug: "realigning-the-soul", duration: 0 },
  { title: "Rational Idealism", slug: "rational-idealism", duration: 0 },
];

export function TrackPage() {
  const { trackSlug } = useParams();
  const navigate = useNavigate();

  // Convert slug back to track index
  const getTrackIndexFromSlug = (slug: string) => {
    const trackMap: { [key: string]: number } = {
      "what-is-ego-death": 0,
      "what-is-non-duality": 1,
      "the-four-selves": 2,
      "realisation-and-transformation": 3,
      "the-evolution-of-nonduality": 4,
      "the-edge-of-evolution": 5,
      "realigning-the-soul": 6,
      "rational-idealism": 7,
    };
    return trackMap[slug];
  };

  const trackIndex = getTrackIndexFromSlug(trackSlug || "");

  // Enhanced debug logging for routing issues
  console.log('🔍 [ROUTING DEBUG] TrackPage loaded:', {
    trackSlug,
    trackIndex,
    isValidSlug: trackSlug && trackIndex !== undefined,
    timestamp: new Date().toISOString()
  });

  // Track page view when component mounts
  useEffect(() => {
    if (trackSlug && trackIndex !== undefined) {
      const track = trackData[trackIndex];
      if (track) {
        trackTrackPageView(track.title, track.slug, trackIndex, track.duration);
      }
    }
  }, [trackSlug, trackIndex]);

  // If invalid slug, redirect to home
  if (!trackSlug || trackIndex === undefined) {
    console.log('TrackPage - Invalid slug, redirecting to home');
    navigate("/");
    return null;
  }

  return (
    <div className="h-screen w-full">
      <AudioPlayer initialTrackIndex={trackIndex} />
    </div>
  );
} 