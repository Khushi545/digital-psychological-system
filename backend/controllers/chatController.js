const crisisKeywords = [
  'suicide', 'kill myself', 'end my life', 'want to die', 
  'harm myself', 'cut myself', 'hopeless', 'no reason to live',
  'giving up', 'overdose'
];

const responses = [
  { 
    keywords: ['anxiety', 'anxious', 'panic', 'nervous', 'worry'], 
    response: 'It sounds like you are feeling anxious. Try taking slow, deep breaths. You can also try the 4-7-8 breathing exercise in our Breathing tab.' 
  },
  { 
    keywords: ['sleep', 'insomnia', "can't sleep", 'tired', 'exhausted'], 
    response: 'Struggling with sleep can be tough. Try establishing a calming bedtime routine and avoiding screens 30 minutes before bed.' 
  },
  { 
    keywords: ['stress', 'stressed', 'overwhelmed', 'pressure', 'exam'], 
    response: 'Feeling overwhelmed is common in college. Breaking tasks into smaller steps can help. Have you tried our mindfulness hub?' 
  },
  { 
    keywords: ['alone', 'lonely', 'isolated', 'friends', 'relationship'], 
    response: 'I am so sorry you are feeling lonely right now. Reaching out on our peer support forum or booking a counselling session can help you connect with others.' 
  },
  { 
    keywords: ['default'], 
    response: 'I hear you. Remember that it is okay to feel this way. If this feeling persists, please consider booking an appointment with one of our counsellors for more support.' 
  }
];

// @desc    Respond to user chat message
// @route   POST /api/chat/respond
// @access  Private
exports.chatRespond = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, error: 'Message text is required' });
    }

    const msgLower = message.toLowerCase();

    // Check for crisis
    const isCrisis = crisisKeywords.some(keyword => msgLower.includes(keyword));
    if (isCrisis) {
      // Typically, log this event here for admin review
      return res.status(200).json({
        success: true,
        data: {
          isCrisis: true,
          response: 'CRISIS ALERT: Please know that you are not alone. Our emergency helpline is 988. Alternatively, campus security can be reached at 555-0199. We strongly urge you to book a priority appointment immediately.',
          action: 'trigger_alert_ui'
        }
      });
    }

    // Match keywords
    let matchedResponse = responses.find(r => r.keywords.some(kw => msgLower.includes(kw)));
    if (!matchedResponse) {
      matchedResponse = responses.find(r => r.keywords.includes('default'));
    }

    res.status(200).json({
      success: true,
      data: {
        isCrisis: false,
        response: matchedResponse.response
      }
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
